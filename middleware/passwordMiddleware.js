import { hash, compare } from 'bcryptjs';
import { AES, enc } from 'crypto-js';

export const passwordHash=async(password)=>{
    const salt=Number(process.env.SALT);
    const hashed=await hash(password,salt);
    return hashed;
}

export const verifyPassword=async(password,hashed)=>{
    return await compare(password,hashed);
}

export const walletEncrypt=(masterKey,password)=>{

    const key=String(process.env.MASTER_KEY)+masterKey;

    const encrypted=AES.encrypt(password,key).toString();
    return encrypted;
}

export const walletDecrypt=(masterKey,data)=>{

     const key=String(process.env.MASTER_KEY)+masterKey;

     const wallets=data.map(entry=>{
         const decrypted=AES.decrypt(entry.password,key).toString(enc.Utf8);
         return {
            ...entry,
            password:decrypted
         };
     });

     return wallets;
}