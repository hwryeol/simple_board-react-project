package com.reactspring.sha;

import java.io.UnsupportedEncodingException;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.InvalidKeyException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.Mac;

import org.spongycastle.util.encoders.Hex;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ViewManager;

public class RCTSha extends ReactContextBaseJavaModule {
    private static final String HMAC_SHA_256 = "HmacSHA256";

    public RCTSha(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RCTSha";
    }

    @ReactMethod
    public void hmac256(String data, String pwd, Promise promise) {
        try {
            String strs = hmac256(data, pwd);
            promise.resolve(strs);
        } catch (Exception e) {
            promise.reject("-1", e.getMessage());
        }
    }

    @ReactMethod
    public void sha256(String data, Promise promise) {
        try {
            String result = shaX(data, "SHA-256");
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("-1", e.getMessage());
        }
    }

    @ReactMethod
    public void sha1(String data, Promise promise) {
        try {
            String result = shaX(data, "SHA-1");
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("-1", e.getMessage());
        }
    }

    @ReactMethod
    public void sha512(String data, Promise promise) {
        try {
            String result = shaX(data, "SHA-512");
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("-1", e.getMessage());
        }
    }

    private String shaX(String data, String algorithm) throws Exception {
        MessageDigest md = MessageDigest.getInstance(algorithm);
        md.update(data.getBytes());
        byte[] digest = md.digest();
        return bytesToHex(digest);
    }

    public static String bytesToHex(byte[] bytes) {
        final char[] hexArray = "0123456789abcdef".toCharArray();
        char[] hexChars = new char[bytes.length * 2];
        for ( int j = 0; j < bytes.length; j++ ) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    private static String hmac256(String text, String key)
            throws NoSuchAlgorithmException, InvalidKeyException, UnsupportedEncodingException
    {
        byte[] contentData = text.getBytes("UTF_8");
        byte[] akHexData = Hex.decode(key);
        Mac sha256_HMAC = Mac.getInstance(HMAC_SHA_256);
        SecretKey secret_key = new SecretKeySpec(akHexData, HMAC_SHA_256);
        sha256_HMAC.init(secret_key);
        return bytesToHex(sha256_HMAC.doFinal(contentData));
    }

    public static class RCTShaPackage implements ReactPackage {
        @Override
        public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
            return Arrays.<NativeModule>asList(
                    new RCTSha(reactContext)
            );
        }

        public List<Class<? extends JavaScriptModule>> createJSModules() {
            return Collections.emptyList();
        }

        @Override
        public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
            return Arrays.asList();
        }
    }
}
