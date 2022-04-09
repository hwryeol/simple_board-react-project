//
//  RCTSha.h
//
//  TaeHeun Lee (nixstory@gmail.com)

#import "RCTSha.h"
#import "CipherUtil.h"

@implementation RCTSha

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(hmac256:(NSString *)base64 key:(NSString *)key
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSError *error = nil;
    NSString *data = [CipherUtil hmac256:base64 key:key];
    if (data == nil) {
        reject(@"hmac_fail", @"HMAC error", error);
    } else {
        resolve(data);
    }
}

RCT_EXPORT_METHOD(sha1:(NSString *)text
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSError *error = nil;
    NSString *data = [CipherUtil sha1:text];
    if (data == nil) {
        reject(@"sha1_fail", @"Hash error", error);
    } else {
        resolve(data);
    }
}

RCT_EXPORT_METHOD(sha256:(NSString *)text
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSError *error = nil;
    NSString *data = [CipherUtil sha256:text];
    if (data == nil) {
        reject(@"sha256_fail", @"Hash error", error);
    } else {
        resolve(data);
    }
}

RCT_EXPORT_METHOD(sha512:(NSString *)text
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    NSError *error = nil;
    NSString *data = [CipherUtil sha512:text];
    if (data == nil) {
        reject(@"sha512_fail", @"Hash error", error);
    } else {
        resolve(data);
    }
}

@end
