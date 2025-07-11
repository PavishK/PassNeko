import db from "@/lib/db.js";
import {passwordHash, verifyPassword} from '@/middleware/passwordMiddleware.js'
import { signToken, verifyToken } from "@/middleware/jwtMiddleware";

//Register

export const registerUser=async(email,password)=>{
    
    const [existing]=await db.execute(`
        SELECT * FROM users WHERE email=?`,[email]);
    if(existing.length>0){
        return {status:409, data:{message:"User already exists"}};
    }

    const hashed=await passwordHash(password);

    await db.execute(`
        INSERT INTO users (email, password) VALUES (?, ?);`,[email,hashed]);
    const [userData]=await db.execute(`SELECT * FROM users WHERE email=?;`,[email]);
    const {id,created_at}=userData[0];
    const jwttoken=signToken({id,email,created_at}); 
    return {status:201, data:{message:"Registered successfully",token:jwttoken}};
}

//Login

export const loginUser=async(email,password)=>{
    const [existing]=await db.execute(`
        SELECT * FROM users WHERE email=?`,[email]);

    if(existing.length==0){
        return {status:401, data:{message:"No user found"}};
    }

    const flag=await verifyPassword(password,existing[0].password);

    if(flag){
       const jwttoken=signToken({id:existing[0].id,email:email,created_at:existing[0].created_at});
       return {status:200,data:{message:"Login successfully",token:jwttoken}};
    }
    else{
        return {status:401,data:{message:"Invalid password"}};
    }
}

// Session Check

export const verifySession=async(token)=>{
    const state=verifyToken(token);
    
    if(!state)
        return {status:401,data:{message:"Session expired"}};
    return {status:200,data:{message:"Valid session",date:state}};
}