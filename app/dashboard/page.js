"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get } from "@/services/store";
import {
    LayoutDashboard,
    EditIcon,
    Clipboard,
    ClipboardCheck,
    PlusCircleIcon,
    XIcon,
    Trash2Icon
} from 'lucide-react';
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import DashboardN from "@/components/DashboardN";
import AddData from "@/components/AddData";
import EditData from "@/components/EditData";

export default function Dashboard() {

    const router=useRouter();
    const [wallets,setWallets]=useState([]);
    const [makeLoading,setMakeLoading]=useState(false);
    const [copieIndex,setCopiedIndex]=useState(null);
    const [addPopup,setAddPopup]=useState(false);
    const [updatePopup,setUpdatePopup]=useState(false);
    const [deletePopup,setDeletePopup]=useState(false);
    const [deleteData,setDeleteData]=useState({});
    const [updatedData,setUpdatedData]=useState({});
    const [MotionDiv,setMotionDiv]=useState();

    const favicons="https://www.google.com/s2/favicons?sz=64&domain=";

    const getWallets=async()=>{
        setMakeLoading(true);
        const token=get();
        try {
            const res=await axios.get(`/api/manage_wallet/${token}`);
            setWallets(res.data.wallets);
        } catch (error) {
            toast.error("Unable to fetch wallets!");
        } finally {
            setMakeLoading(false);
        }
    }

    
    const sessionCheck=async(token)=>{
        setMakeLoading(true);
        try {
            await axios.post("/api/session_verify",{token});
            await getWallets();
        } catch (error) {
            toast.error("Please login to continue");
            router.push("/");
        } finally {
            setMakeLoading(false);
        }
    }

    const getHostName=(url)=>{
        try {
            return new URL(url).hostname;
        } catch (error) {
            return url;
        }
    }

    const onClickClipBoard=(index,username,password)=>{
        navigator.clipboard.writeText(username+" \n "+password);
        setCopiedIndex(index);
        setTimeout(()=>setCopiedIndex(null),1000);
        toast.success("Copied to clipboard!");
    }

    const onOpenWindow=(i,data)=>{
        onClickClipBoard(i,data.username,data.password);
        setTimeout(()=>window.open(data.url,"_blank"),500);
    }

    const onClickEditIcon=(i,data)=>{
        setUpdatedData({index:i,data:data});
        setUpdatePopup(true);
    }

    const AddNewData=async(data)=>{
        setMakeLoading(true);
        try {
            await axios.post("/api/manage_wallet",{token:get(),...data});
            setWallets([...wallets,data]);
            toast.success("New wallet added!");
            getWallets();
        } catch (error) {
            toast.error("Unable to add wallet!");
        } finally {
            setMakeLoading(false);
            setAddPopup(false);
        }
    }

    const UpdateData=async(data)=>{
        setMakeLoading(true);
        try {
            await axios.put("/api/manage_wallet/",{token:get(),...data.data});
            wallets[data.index]=data.data;
            toast.success("Wallet updated successfully!");
            getWallets();
        } catch (error) {
            toast.error("Unable to update wallet!");
        } finally {
            setMakeLoading(false);
            setUpdatePopup(false);
        }
    }

    const deletePopupHandler=(i,data)=>{
        setDeleteData({index:i,data:data});
        setDeletePopup(true);
    }

    const DeleteWallet=async()=>{
        setMakeLoading(true);
        try {
            const {id}=deleteData.data;
            await axios.delete(`/api/manage_wallet/${id}`);
            setWallets(wallets.filter((_,i)=>i!=deleteData.index));
            toast.success("Wallet deleted successfully!");
            getWallets();
        } catch (error) {
            toast.error("Unable to delete wallet!");
        } finally {
            setMakeLoading(false);
            setDeletePopup(false);
        }
    }


    useEffect(()=>{
        const jwt=get();
        if(jwt===false){
            toast.error("Please login to continue");
            router.push("/");
        }
        else{
            sessionCheck(jwt);
        }

        import('framer-motion').then((mod)=>{
            setMotionDiv(mod.motion.div);
        });



    },[router, sessionCheck]);

    if(!MotionDiv) return null;

    return (
       <>
        <PlusCircleIcon onClick={()=>setAddPopup(true)} size={55} className={`${wallets.length==0?'animate-bounce':'animate-pulse'} z-[9999] cursor-pointer fixed bottom-4 right-4 transition-transform hover:scale-105 text-white bg-black rounded-full`}/>

        <DashboardN/>

        {/* DASHBOARD */}
        <div className="bg-gray-100 h-screen overflow-auto w-full flex items-start justify-star' flex-col">
        <div className="flex items-center justify-center w-full flex-col gap-y-1">
        <div className="flex items-center justify-center w-full gap-x-1 text-2xl font-semibold capitalize p-3">
        <LayoutDashboard size={30}/>
        Dashboard
        </div>
        <hr className="border sm:w-lg w-full"/>
        </div>

        <div className={` ${wallets.length==0?'block':'hidden'} flex flex-col items-center justify-center text-gray-500 text-center w-full h-full`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h3l2 2h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
        <p className="text-xl font-semibold">Your vault is empty</p>
        <p className="text-sx text-gray-400 mt-1">Start saving your passwords to access them anytime, anywhere.</p>
        </div>


        <div className={`${wallets.length==0?'hidden':'block'} w-full px-1 sm:px-32 mt-14 mb-14 flex flex-wrap items-center justify-center gap-6`}>
        
        {wallets.map((data,i)=>(

            <div className="relative bg-white sm:bg-transparent hover:bg-white cursor-pointer transition-colors ease-linear group w-48 h-48 rounded-lg flex items-center justify-center"
            key={i}>
                
                <div className="absolute right-0 top-0 p-0.5 sm:hidden group-hover:block ">
                <EditIcon size={23} className="cursor-pointer" onClick={()=>onClickEditIcon(i,data)}/>
                {copieIndex!=i?(
                <Clipboard size={23} className="cursor-pointer mt-1" onClick={()=>onClickClipBoard(i,data.username,data.password)}/>
                ):(
                <ClipboardCheck size={23} className="cursor-pointer mt-1"/>
                )}
                </div>

        
            <div className=" flex items-center justify-center flex-col w-full gap-y-2.5"
            onClick={()=>onOpenWindow(i,data)}
            >
                <Image priority alt={getHostName(data.url)}  src={favicons+getHostName(data.url)} width={100} height={100} className="border w-24 h-24 rounded-lg object-cover"/>
                <p className="text-lg font-normal line-clamp-1 w-full text-center">{getHostName(data.url)}</p>
            </div>
            <Trash2Icon size={26} className="cursor-pointer text-red-500 absolute left-0 bottom-0 p-0.5 sm:hidden group-hover:block "
                onClick={()=>deletePopupHandler(i,data)}
            />
            </div>
        ))}
        </div>

        </div>

        {addPopup && (
        <MotionDiv
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.4}}
         className="fixed top-0 left-0 z-[1000] w-screen h-screen flex items-start justify-center bg-white/60">
          <div className="top-44 w-[90%] max-w-md bg-white rounded-tr-2xl rounded-lg p-4 shadow-lg relative">
          <div className="absolute right-0 top-0 text-white cursor-pointer font-bold bg-black rounded-tr-2xl">
            <XIcon size={30} onClick={()=>setAddPopup(false)} className="p-1"/>
          </div>
          <div>
            <AddData newWallet={(data)=>AddNewData(data)}/>
          </div>
          </div>
        </MotionDiv> 
        )}

        {updatePopup && (
        <MotionDiv
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.4}}
         className="fixed top-0 left-0 z-[1000] w-screen h-screen flex items-start justify-center bg-white/60">
          <div className="top-44 w-[90%] max-w-md bg-white rounded-tr-2xl rounded-lg p-4 shadow-lg relative">
          <div className="absolute right-0 top-0 text-white cursor-pointer font-bold bg-black rounded-tr-2xl">
            <XIcon size={30} onClick={()=>setUpdatePopup(false)} className="p-1"/>
          </div>
          <div>
            <EditData updateWallet={(data)=>UpdateData(data)} data={updatedData}/>
          </div>
          </div>
        </MotionDiv> 
        )}

        {deletePopup && (
        <MotionDiv
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.4}}
         className="fixed top-0 left-0 z-[1000] w-screen h-screen flex items-start justify-center bg-white/60">
          <div className="top-44 w-[90%] max-w-md bg-white rounded-tr-2xl rounded-lg p-4 shadow-lg relative">
          <div className="absolute right-0 top-0 text-white cursor-pointer font-bold bg-black rounded-tr-2xl">
            <XIcon size={30} onClick={()=>setDeletePopup(false)} className="p-1"/>
          </div>
            <div className="flex items-center justify-normal flex-col gap-y-3 w-full">
            <h1 className="text-2xl font-semibold text-red-500">Delete data</h1>
            <h2 className="text-lg font-semibold">Are you sure you want to delete this wallet?</h2>
            <p className="text-lg text-blue-500">{deleteData.data.url}</p>
            <div type="submit" className="cursor-pointer self-center bg-black w-full py-2 rounded-lg text-white flex items-center justify-center font-semibold text-lg mt-1.5"
            onClick={DeleteWallet}
            >
            <button>Delete</button>
            </div>
            </div>
          </div>
        </MotionDiv> 
        )}

        <Loading isLoading={makeLoading}/>
       </>
    );
}