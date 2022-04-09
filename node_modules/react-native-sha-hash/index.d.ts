declare module '@reactspring/react-native-sha-hash' {
    function hmac256(ciphertext: string, key: string): Promise<string>;
    function sha1(text: string): Promise<string>;
    function sha256(text: string): Promise<string>;
    function sha512(text: string): Promise<string>;
}
