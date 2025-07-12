"use client";

import { useEffect, useState } from "react";
import { fetchUserData } from "./fetchData";
import { get } from "@/services/store";
import {
    ArrowLeft,
    LucideView,
    MailIcon,
} from 'lucide-react';
import toast from "react-hot-toast";
import DashboardN from "@/components/DashboardN";
import Loading from "@/components/Loading";
import { useRouter
 } from "next/navigation";

export default function View_Profile() {

    const router=useRouter();
    const [userData,setUserData]=useState({email:"",created_at:""});
    const [makeLoading, setMakeLoading]=useState(false);

    const fetch=async()=>{
        setMakeLoading(true);
        try {
            setUserData(await fetchUserData(get()));
        } catch (error) {
            toast.error("Please login to continue");
            router.push('/');
        } finally {
            setMakeLoading(false);
        }
    }
    
    useEffect(()=>{
        fetch();
    },[])

    return (
        <>
        <DashboardN/>
        <div className="bg-gray-100 h-screen overflow-auto w-full flex items-start justify-star' flex-col">
        <div className="flex items-center justify-center w-full flex-col gap-y-1">
        <div className="relative flex items-center justify-center w-full gap-x-1 text-2xl font-semibold capitalize p-3">
        <ArrowLeft size={30} className="absolute sm:left-1/3 left-2 cursor-pointer"
            onClick={()=>router.push('/dashboard')}
        />
        <LucideView size={30}/>
        View Profile
        </div>
        <hr className="border sm:w-lg w-full"/>
        </div>

        <div className="flex items-center justify-center w-full mt-14">
        <div className="w-full px-10 flex items-center justify-center flex-col">
        <div className="flex items-start justify-normal gap-x-1 text-xl font-semibold">
            <MailIcon size={30}/>
            USERID
        </div>
        <div className="border px-2 bg-white p-2 rounded-lg w-full sm:w-72 mt-2 text-xl">{userData.email}</div>
    </div>
        </div>
        <div className="flex items-center justify-normal flex-col w-full fixed bottom-2 text-lg font-semibold px-2 border-t">
        Account created at - {new Date(userData?.created_at).toDateString()}
        </div>
        </div>
        <Loading isLoading={makeLoading}/>
        </>
    );
}