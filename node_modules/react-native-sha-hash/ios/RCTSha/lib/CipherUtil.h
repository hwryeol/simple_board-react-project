//
//  CipherUtil.h
//
//
//  TaeHeun Lee (nixstory@gmail.com)

#import <Foundation/Foundation.h>

@interface CipherUtil : NSObject
+ (NSString *) hmac256: (NSString *)input key: (NSString *)key;
+ (NSString *) sha1: (NSString *)input;
+ (NSString *) sha256: (NSString *)input;
+ (NSString *) sha512: (NSString *)input;
+ (NSString *) toHex: (NSData *)nsdata;
+ (NSData *) fromHex: (NSString *)string;
@end
