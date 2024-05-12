import NextCrypto from "next-crypto";

// should be some ENV variable
const crypto = new NextCrypto("secret key");

export default crypto;
/* 
usage

const encrypted = await crypto.encrypt('hello!');
const decrypted = await crypto.decrypt(encrypted);
*/
