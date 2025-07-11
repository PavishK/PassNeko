import { NextResponse } from "next/server";
import { registerUser } from "@/controllers/userController.js";

export async function POST(request) {
    try {
        const {email,password,confirm_password}= await request.json();
        if(!email || !password || !confirm_password)
            return NextResponse.json({message:"Please fill out the fields"},{status:400});
        
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
            return NextResponse.json({message:"Invalid email format"},{status:401});

        else if(password.length<8 || password.length>15)
            return NextResponse.json({message:"Password length must in between 8 and 15"},{status:401});
        
        else if(password!==confirm_password)
            return NextResponse.json({message:"Password not matching"},{status:401}); 

        const {data,status}=await registerUser(email, password)
        return NextResponse.json({message:data.message,token:data.token},{status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Server error"},{status:500});
    }
}