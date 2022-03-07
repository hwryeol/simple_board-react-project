const express = require('express');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app=express();
const port=3001;
const uuid = require('uuid')
const session = require('express-session');
const e = require('express');
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host:'localhost',
    user:'root',
    password:"z1x2c3v4",
    database:'simpleforum',
    multipleStatements:true
};
const corsOptions={
    origin:'*',
    credential:true
}

const sessionStore = new MySQLStore(options);
const sessionOption = {
    secret:uuid.v1(),
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:600000},
    store:sessionStore
}


const db = mysql.createConnection(options);

app.use(session(sessionOption));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


db.connect();


async function getUserData(uuid){
    let result = new Promise( resolve => {
        db.query('select nickname,create_at,id from users where uuid=?',[uuid],(err, result)=>{
            if(err) throw err;
            resolve(result[0]);
        })
    })
    return result; 
}

app.listen(port,()=>{
    console.log("server is running");
})

app.post('/signup',async (req,res)=>{
    const {id,nickname,password} = req.body;
    db.query('select id from users where id=?',id,(err,result)=>{
        if(err) throw err;
        if(result[0]===undefined){
            db.query('INSERT INTO users(id,nickname,password,uuid) values(?,?,?,?)'
            ,[id,nickname,password,uuid.v1()],(err,result)=> {if(err) throw err})
        }else{
            res.status(401).end();
        }
    })
    
})


app.post('/login',(req,res)=>{
    const post = req.body;
    db.query('select * from users where id=? and password=?',
    [post.id, post.password],(err,result)=>{
        if(err) throw err;
        if(result[0]!==undefined){
            req.session.uuid = result[0]['uuid'];
            req.session.isLogined = true;
            req.session.save();
            res.status(200).end();
        }
    })
});

app.get('/forums/pages/:page',(req,res)=>{
    const queryString = `
    select count(*) as cnt from forums;
    select
    forums.no as no,
    forums.title as title,
    forums.create_at as create_at,
    forums.view_count as view_count,
    users.nickname as nickname
    from forums,users where forums.user_uuid = users.uuid ORDER BY no DESC limit ?,10;
    `
    db.query(queryString,(req.params.page-1)*10,(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
})

app.get('/comments/:no',(req,res)=>{
    const queryString = `SELECT
    contents,
    user_uuid,
    create_at,
    seq,lvl
    from comments where post_no=?; 
    `;
    db.query(queryString,req.params.no,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result));
    })
})

app.get('/forums/:no',(req,res)=>{
    const queryString = `
    select
    forums.no as no,
    forums.title as title,
    forums.contents as contents,
    forums.create_at as forums_create_at,
    users.nickname as nickname,
    users.create_at as user_create_at,
    users.id as id
    from forums,users where forums.user_uuid = users.uuid and forums.no=?;
    update forums set view_count=view_count+1 where no=?
    `
    db.query(queryString,[req.params.no,req.params.no],(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result[0]));
    })
})

app.delete('/forums/:no',(req,res)=>{
    if(!req.session.isLogined)res.status(401).end();
    else{
        const queryString = `DELETE FROM forums WHERE no=? and user_uuid=?`;
        db.query(queryString,[req.params.no,req.session.uuid],(err,result)=>{
            if(err) throw err;
        })
    }
})



app.get('/profile',(req,res)=>{
    if(!req.session.isLogined)res.status(401).end();
    else{
        const userData = getUserData(req.session.uuid);
        userData.then(data => res.json(data));
    }
})
app.post('/profile',(req,res)=>{
    if(!req.session.isLogined)res.status(401).end();
    else{
        const post = req.body;
        db.query('UPDATE users SET nickname=? where uuid=?',[post.nickname,req.session.uuid],(err,result)=>{
            if(err) throw err;
            res.status(200).end();  
        })
    }
})

app.post('/forums',async (req,res)=>{
    if(!req.session.isLogined)res.status(401).end();
    else{
        const post = req.body;
        const userData = await getUserData(req.session.uuid);
        const insertValues = [post.title, post.contents, userData['uuid']];
        
        db.query('INSERT INTO forums(title,contents,user_uuid) values(?,?,?)',insertValues,(err, result)=>{
            if(err) throw err;
            res.status(200).end();
        });
        }
    })

