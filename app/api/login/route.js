import { NextResponse } from "next/server";
import { loginUser } from "@/controllers/userController";

export async function POST(req) {
    try {
        const {email,password}=await req.json();
        if(!email || !password)
            return NextResponse.json({message:"Email and password required"},{status:400});
        const {data,status}=await loginUser(email,password);
        return NextResponse.json(data,{status});
        // return NextResponse.redirect(new URL('/dashboard',req.url));
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}