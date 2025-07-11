"use client";

const key="and0dG9rZW4="; //jwttoken

export const set=(data)=>{
    const str=window.btoa(JSON.stringify(data));
    localStorage.setItem(key,str);
}

export const get=()=>{
    const data=localStorage.getItem(key);
    if(!data)
        return false;
    return  JSON.parse(window.atob(data));
}

export const remove=()=>{
    localStorage.removeItem(key);
}