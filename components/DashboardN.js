"use client";

import { remove } from '@/services/store';
import {
    Menu,
    XIcon,
    UserCircle,
    UserPen,
    ArrowRight,
    ViewIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardN() {

    const router=useRouter();
    const [toggleMenu,setToggleMenu]=useState(false);
    const [toggleProfile,setToggleProfile]=useState(false);

    const onLogOutClicked=()=>{
        remove();
        router.push("/");
        toast.success("Logout successfull!");
    }

    return (
        <nav className="flex  items-center justify-between p-2 text-2xl w-full my-2 px-6">
            <h1 className="capitalize font-semibold cursor-pointer" onClick={()=>router.push("/")}>PassNeko</h1>
            <ul className="items-center justify-center gap-x-6 sm:flex hidden ">
               <li className='hidden sm:block'>
               {!toggleProfile?(
                <UserCircle size={38} className='cursor-pointer transition-colors hover:text-gray-500'
                    onClick={()=>setToggleProfile(true)}
                />
               ):(
                
                <XIcon size={38} className='cursor-pointer' onClick={()=>setToggleProfile(false)}/>
               )}
               </li>

                <li>
                    <button className="bg-black text-white p-1.5 text-xl font-semibold rounded-lg hover:cursor-pointer hover:bg-white hover:text-black transition-colors">Hire Me</button>
                </li>
            </ul>
        {!toggleMenu?(
        <Menu size={30} className='sm:hidden block' onClick={()=>setToggleMenu(prev=>!prev)}/>
        ):(
        <XIcon size={30} className='sm:hidden block' onClick={()=>setToggleMenu(prev=>!prev)}/>
        )}
        <div className={`absolute z-[1000] top-5.5 right-14 bg-gray-100 p-4 w-fit border rounded-lg sm:hidden block
        ${toggleMenu?'block':'hidden'}
        `}>
            <ul className={`items-center justify-center flex-col gap-y-4 flex`}>
                <li className='flex items-center justify-normal text-lg capitalize gap-x-1 hover:underline cursor-pointer'
                onClick={()=>router.push("/view_profile")}
                >
                   <UserPen/> edit profile
                </li>
                <hr className='border w-full'/>
                <li>
                    <button className="bg-black text-white p-1.5 text-xl font-semibold rounded-lg hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
                    onClick={() => window.open("https://personal-portfolio-rdxc.onrender.com", "_blank", "width=900,height=800")}
                    >Hire Me</button>
                </li>
            </ul> 
            <div className='flex items-center cursor-pointer hover:underline justify-start w-full  text-lg mt-3 flex-row-reverse gap-x-0.5'
             onClick={onLogOutClicked}>
                <ArrowRight size={20}/>logout
            </div>
        </div>

        <div className={`absolute top-6 hidden z-[1000] right-44 bg-gray-100 p-4 w-fit border rounded-lg
        ${toggleProfile?'sm:block':'sm:hidden'}
        `}>
            <ul className={`items-center justify-center flex-col gap-y-4 flex`}>
                <li className='flex items-center justify-normal text-lg capitalize gap-x-1.5 hover:underline cursor-pointer'
                onClick={()=>router.push("/view_profile")}
                >
                   <ViewIcon/> View profile
                </li>
            </ul> 
            <div className='flex items-center hover:underline cursor-pointer  justify-start w-full  text-lg mt-3 flex-row-reverse gap-x-0.5'
             onClick={onLogOutClicked}>
                <ArrowRight size={20}/>logout
            </div>
        </div>

        </nav>
    );
}