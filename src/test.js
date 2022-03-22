const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const passport = require('passport')
,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();

//기본 회원정보 (웹 실무시 데이터 베이스로 대체 하면됨)
let db = [{
	id : '1',
	email : 'goodmemory@tistory.com',
    password : 'goodmemory',
    name : 'goodmemory',
    provider : '',
    token : '',
    providerId : ''
}];

//구글 api ID, Secret 정보 저장 (구글 개발자 웹 내 앱ID, 시크릿 입력)
const googleCredentials = {
    "web": {
        "client_id": "",
        "client_secret": "",
        "redirect_uris": [
            "http://localhost:3000/auth/google/callback"
        ]
    }
}


//MIDDLEWARE
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store : new fileStore()
}));

//PASSPORT - 전용 middleware 추가
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT - 직렬화 
//serializeUser : 로그인 / 회원가입 후 1회 실행
//deserializeUser : 페이지 전환시 마다 실행 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(user, done) {
	done(null, user);
});


//PASSPORT (Google) - 구글 로그인시 정보 GET
passport.use(new GoogleStrategy({
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris[0]
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
       let user = db.find(userInfo => userInfo.email === profile.emails[0].value);
       if(user) {
           user.provider = profile.provider;
           user.providerId = profile.id;
           user.token = accessToken;
           user.name = profile.displayName;
       }else {
           user = {
               id : 2,  //랜덤값 필요시, npm shortid 설치 후 shortid.generate() 활용
               provider : profile.provider,
               providerId : profile.id,
               token : accessToken,
               name : profile.displayName,
               email : profile.emails[0].value
           }
           db.push(user);
       }
         return done(null, user);
  }
));

//구글 로그인 버튼 클릭시 구글 페이지로 이동하는 역할
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));


//구글 로그인 후 자신의 웹사이트로 돌아오게될 주소 (콜백 url)
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/');
  });

//홈페이지 생성 (req.user는 passport의 serialize를 통해 user 정보 저장되어있음)
app.get('/',(req,res)=>{
	const temp = getPage('Welcome', 'Welcome to visit...',getBtn(req.user));
    res.send(temp);
});

//로그아웃 페이지 : 로그 아웃 처리 + 세션 삭제 + 쿠키 삭제 후 홈으로 리다이렉션
//passport 패키지로 인해 req.logout()으로 로그아웃 기능 구현 가능
app.get('/auth/logout',(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) next(err);
        req.logOut();
        res.cookie(`connect.sid`,``,{maxAge:0});
        res.redirect('/');
    });
});

//에러처리
app.use((err,req,res,next)=>{
  if(err) console.log(err);
  res.send(err);
});

//로그인 or 로그아웃 상태에 따른 버튼 생성
const getBtn = (user) =>{
    return user !== undefined ? `${user.name} | <a href="/auth/logout">logout</a>` : `<a href="/auth/google">Google Login</a>`;
}

//페이지 생성 함수
const getPage = (title, description,auth)=>{
	return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            ${auth}
            <h1>${title}</h1>
            <p>${description}</p>
        </body>
        </html>
        `;
}

//SERVER
app.listen(3000,()=>console.log('http://localhost:3000'));