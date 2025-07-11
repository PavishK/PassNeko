"use client";

import {
    Menu,
    XIcon
} from 'lucide-react';
import { useState } from 'react';

export default function NavBar() {

    const [toggleMenu,setToggleMenu]=useState(false);

    return (
        <nav className="flex items-center justify-between p-2 text-2xl w-full my-2 px-6">
            <h1 className="capitalize font-semibold">PassNeko</h1>
            <ul className="items-center justify-center gap-x-6 sm:flex hidden ">
                <li>
                    <button className="bg-black text-white p-1.5 text-xl font-semibold rounded-lg hover:cursor-pointer hover:bg-white hover:text-black transition-colors">Hire Me</button>
                </li>
            </ul>
        {!toggleMenu?(
        <Menu size={30} className='sm:hidden block' onClick={()=>setToggleMenu(prev=>!prev)}/>
        ):(
        <XIcon size={30} className='sm:hidden block' onClick={()=>setToggleMenu(prev=>!prev)}/>
        )}
        <div className={`absolute z-[1000] top-5.5 right-14 bg-gray-100 p-6 w-40 border rounded-lg sm:hidden block
        ${toggleMenu?'block':'hidden'}
        `}>
            <ul className={`items-center justify-center flex-col gap-y-6 flex`}>
                <li>
                    <button className="bg-black text-white p-1.5 text-xl font-semibold rounded-lg hover:cursor-pointer hover:bg-white hover:text-black transition-colors"
                    onClick={() => window.open("https://personal-portfolio-rdxc.onrender.com", "_blank", "width=900,height=800")}
                    >Hire Me</button>
                </li>
            </ul> 
        </div>

        </nav>
    );
}