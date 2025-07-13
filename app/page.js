"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation.js";
import { useRouter } from "next/navigation.js";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import {
  ArrowRightCircle,
  ArrowRight,
  XIcon,
  X
} from 'lucide-react';
import { get, remove } from "@/services/store.js";
import Login from './login/page.js';
import axios from "axios";
import toast from "react-hot-toast";
import { setRandomFallback } from "bcryptjs";
import Loading from "@/components/Loading.js";

export default function Home() {

  const router=useRouter();
  const [MotionDiv,setMotionDiv]=useState();
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [showPopup,setShowPopup]=useState(false);
  const [makeLoading,setMakeLoading]=useState(true);
  const pathName=usePathname();

  const verifyToken=async(token)=>{
    try {
      await axios.post("/api/session_verify",{token});
      setIsLoggedIn(true);
    } catch (error) {
      toast.error("Session expired!");
      setIsLoggedIn(false);
      remove();
    }
  }

  useEffect(()=>{
    const timer=setTimeout(()=>setMakeLoading(false),2000);

    return ()=>clearTimeout(timer);
  },[])

  useEffect(()=>{
    const token=get();
    if(token===false)
      setIsLoggedIn(false);
    else{
      setIsLoggedIn(true);
      verifyToken(token);
    }
  },[pathName])

  useEffect(()=>{

    const token=get();
    setIsLoggedIn(token===false?false:true);

    import('framer-motion').then((mod)=>{
      setMotionDiv(()=>mod.motion.div);
    });
  },[showPopup]);

  if(!MotionDiv) return null;

  const moveToDashboard=()=>{
    if(isLoggedIn){
      router.push('/dashboard');
    }
    else{
      toast.error("Please login to continue");
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-normal flex-col w-full">
      <NavBar/>
      {/* HOME BODY */}
      <div className="bg-gray-100 h-screen w-full flex items-center justify-center flex-col">
      <div className="flex items-center justify-normal flex-col -mt-28 sm:-mt-28">
      <MotionDiv
      drag
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}>
        <Image src={"/cat_logo.png"} alt="PassCat" width={250} height={200} style={{width:'auto',height:'200'}}/>
    </MotionDiv>
        <h1 className="text-3xl font-bold">PassNeko</h1>
      </div>
      <div className="sm:w-[60vw] px-3.5 mt-6 text-center text-gray-700">
        <p>PassNeko is a simple and secure password manager that helps you manually store and manage your passwords in one safe place. 
        Every password you save is encrypted with advanced security, ensuring that only you can access your data — not even we can see it. Designed for privacy and ease of use, 
        PassNeko lets you keep track of your login details without worrying about security risks. With clean design, encrypted storage, and full user control, 
        PassNeko is the safest way to manage your passwords manually and privately.</p>
        </div>

      {!isLoggedIn?(
      <button className="flex cursor-pointer items-center justify-normal gap-x-3 bg-black mt-6 p-2 text-xl rounded-lg transition-transform hover:scale-105 w-40 text-white font-semibold"
      onClick={()=>setShowPopup(true)}>
      Get Started 
      <ArrowRightCircle/>
      </button>
      ):(
      <button className="flex items-center cursor-pointer justify-center gap-x-3 bg-black mt-6 p-2 text-xl rounded-lg transition-transform hover:scale-105 w-40 text-white font-semibold"
      onClick={moveToDashboard}>
      Dashboard 
      <ArrowRight/>
      </button>      
      )}
      </div>

      {showPopup && (
        <MotionDiv
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.4}}
         className="fixed top-0 left-0 z-[1000] w-screen h-screen flex items-start justify-center bg-white/60">
          <div className="top-44 w-[90%] max-w-md bg-white rounded-tr-2xl rounded-lg p-4 shadow-lg relative">
          <div className="absolute right-0 top-0 text-white cursor-pointer font-bold bg-black rounded-tr-2xl">
            <XIcon size={30} onClick={()=>setShowPopup(false)} className="p-1"/>
          </div>
          <div>
            <Login closePopup={()=>setShowPopup(false)}/>
          </div>
          </div>
        </MotionDiv>
      )}

      <Loading isLoading={makeLoading}/>
    </div>
  );
}