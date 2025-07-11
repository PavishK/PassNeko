import { NextResponse } from "next/server";
import { getSavedWallets, removeWallet } from "@/controllers/walletController";

export async function GET(req,{ params }) {
    try {
        const {id}=await params;
        if(!id)
            return NextResponse.json({message:"Missing data"},{status:400});
        const {data,status}=await getSavedWallets(id);
        return NextResponse.json(data,{status});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}

export async function DELETE(req,{params}) {
    try {
        const {id}=await params;

        if(!id)
            return NextResponse.json({message:"Missing data"},{status:400});

        const {data,status}=await removeWallet(id);
        return NextResponse.json(data,{status});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}