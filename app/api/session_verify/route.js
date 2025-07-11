import { NextResponse } from "next/server";
import { verifySession } from "@/controllers/userController";

export async function POST(req) {
   try {
    const {token}=await req.json();
    if(!token)
        return NextResponse.json({message:"Please login to continue"},{status:200});

    const {data,status}=await verifySession(token);
    return NextResponse.json(data,{status});

   } catch (error) {
    return NextResponse.json({message:"Internal server error"},{status:500});
   }
}