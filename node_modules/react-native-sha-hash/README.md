# React Native SHA1 / SHA256 / SHA512 / HMAC-SHA256

SHA Hash native module for react-native

## Installation

```sh
npm install --save react-native-sha-hash
```

or

```sh
yarn add react-native-sha-hash
```

### Installation (iOS)

##### Using CocoaPods (React Native 0.60 and higher)

```sh
cd ios
pod install
```

### Installation (Android)

##### React Native 0.60 and higher
- Linking automatically

## Usage

### Example

```js
import { NativeModules, Platform } from 'react-native'
var SHA = NativeModules.Sha
```

#### SHA1
```ts
  private sha1 () {
    const plain_string:string = "1234567890";
    console.log ("[iOS] plaing string : " + plain_string);

    try {
      SHA.sha1(plain_string).then((hash: any) => {
        console.log ("[iOS] SHA1 hash : " + hash);
      })
    } catch (e) {
        console.error(e)
    }   
  }
```

#### SHA256
```ts
  private sha256 () {
    const plain_string:string = "1234567890";

    try {
      SHA.sha256(plain_string).then((hash: any) => {
        console.log ("[iOS] SHA256 hash : " + hash);
      })
    } catch (e) {
        console.error(e)
    }  
  }
```

#### SHA512
```ts
  private sha512 () {
    const plain_string:string = "1234567890";

    try {
      SHA.sha512(plain_string).then((hash: any) => {
        console.log ("[iOS] SHA512 hash : " + hash);
      })
    } catch (e) {
        console.error(e)
    }  
  }
```

#### HMAC-SHA256
```ts
  private hmac256 () {
    const plain_string:string = "1234567890";
    const key:string = "1234567890123456"

    try {
      SHA.hmac256(plain_string, key).then((hash: any) => {
        console.log ("[iOS] HMAC SHA256 key : " + key);
        console.log ("[iOS] HMAC SHA256 hash : " + hash);
      })
    } catch (e) {
        console.error(e)
    }  
  }
```

#### iOS Test
```ts
[Fri Aug 21 2020 15:05:26.715]  LOG      [iOS] plaing string : 1234567890
[Fri Aug 21 2020 15:05:26.716]  LOG      [iOS] SHA1 hash : 01b307acba4f54f55aafc33bb06bbbf6ca803e9a
[Fri Aug 21 2020 15:05:27.280]  LOG      [iOS] SHA256 hash : c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646
[Fri Aug 21 2020 15:05:27.796]  LOG      [iOS] SHA512 hash : 12b03226a6d8be9c6e8cd5e55dc6c7920caaa39df14aab92d5e3ea9340d1c8a4d3d0b8e4314f1f6ef131ba4bf1ceb9186ab87c801af0d5c95b1befb8cedae2b9
[Fri Aug 21 2020 15:05:28.358]  LOG      [iOS] HMAC SHA256 key : 1234567890123456
[Fri Aug 21 2020 15:05:28.359]  LOG      [iOS] HMAC SHA256 hash : 6bda0db7eca1d37b25d7beadae2290fa6a8b894ed02f0bc6e3d92583ae1a0dbe
```

#### Android Test
```ts
[Fri Aug 21 2020 15:10:05.926]  LOG      [Android] plaing string : 1234567890
[Fri Aug 21 2020 15:10:05.958]  LOG      [Android] SHA1 hash : 01b307acba4f54f55aafc33bb06bbbf6ca803e9a
[Fri Aug 21 2020 15:10:09.351]  LOG      [Android] SHA256 hash : c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646
[Fri Aug 21 2020 15:10:10.968]  LOG      [Android] SHA512 hash : 12b03226a6d8be9c6e8cd5e55dc6c7920caaa39df14aab92d5e3ea9340d1c8a4d3d0b8e4314f1f6ef131ba4bf1ceb9186ab87c801af0d5c95b1befb8cedae2b9
[Fri Aug 21 2020 15:10:11.780]  LOG      [Android] HMAC SHA256 key : 1234567890123456
[Fri Aug 21 2020 15:10:11.782]  LOG      [Android] HMAC SHA256 hash : 6bda0db7eca1d37b25d7beadae2290fa6a8b894ed02f0bc6e3d92583ae1a0dbe
```
