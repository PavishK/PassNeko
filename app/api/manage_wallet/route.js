import { saveWalletData, updateWallet } from "@/controllers/walletController";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {token,url,username,password}=await req.json();
        if(!token || !url || !username || !password)
            return NextResponse.json({message:"Missing data"},{status:400});
        const {data,status}=await saveWalletData(token, url, username, password);
        return NextResponse.json(data,{status});

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error"},{status:500});
    }    
}

export async function PUT(req) {
    try {
        const {token,id,url,username,password}=await req.json();
        if(!token || !id || !url || !username || !password)
            return NextResponse.json({message:"Missing data"},{status:400});
        const {data,status}=await updateWallet(token, id, url, username, password);
        return NextResponse.json(data,{status});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error"},{status:500});
    } 
}