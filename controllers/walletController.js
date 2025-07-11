import db from "@/lib/db";
import { walletEncrypt, walletDecrypt } from "@/middleware/passwordMiddleware";
import { verifyToken } from "@/middleware/jwtMiddleware";

export async function saveWalletData(token,url,username,password) {

    const userData=verifyToken(token);
    if(userData===null){
        return {data:{message:"An error occured!"},status:400};
    }
    const {id}=userData;
    
    const hashed=walletEncrypt(id,password);
    
    let sql=`
    INSERT INTO wallets (user_id, url, username, password) VALUES (?, ?, ?, ?);
    `;
    await db.execute(sql,[id, url, username, hashed]);

    return {data:{message:"Wallet saved successfully!"},status:201};
}

export async function getSavedWallets(token) {

    const userData=verifyToken(token);
    if(userData===null){
        return {data:{message:"An error occured!"},status:400};
    }
    let sql=`
    SELECT * FROM wallets WHERE user_id=?;
    `;
    const [result]=await db.execute(sql,[userData.id]);
    const wallets=walletDecrypt(userData.id,result);
    return {data:{message:"Wallets fetched",wallets:wallets},status:200};
}

export async function updateWallet(token,wallet_id,url,username,password) {

    const userData=verifyToken(token);
    if(userData===null){
        return {data:{message:"An error occured!"},status:400};
    }
    const {id}=userData;
    
    const hashed=walletEncrypt(id,password);
    
    let sql=`
    UPDATE wallets SET url=?, username=?, password=? WHERE id=? AND user_id=?;
    `;

    await db.execute(sql,[url, username, hashed, wallet_id, id]);

    return {data:{message:"Wallet updated successfully!"},status:200};
}


export async function removeWallet(id) {
    let sql=`
    DELETE FROM wallets WHERE id=?;
    `;
    await db.execute(sql,[id]);
    return {data:{message:"wallet removed successfully!"}, status:200};
}