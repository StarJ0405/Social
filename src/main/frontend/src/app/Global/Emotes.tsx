"use client";
import DropDown from "@/app/Global/DropDown";
import {useState} from "react";

export const emoteList = ['😁','😂','🤣','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','🙂','🤗','🤩'];
interface EmoteDropDownProps{
    input: HTMLInputElement;
}
export function EmoteDropDown({input}:EmoteDropDownProps){
    const [isOpen,setIsOpen] = useState(false);

    const items = [];
    for(let i=0; i<emoteList.length;i++){
        const handler = () => {if(input.value) input.value = input.value + emoteList[i]; else input.value = emoteList[i]};
        items.push({key:emoteList[i],label: emoteList[i], className: 'flex flex-wrap w-[20px]', onClick: handler});
    }
      
    return <>
        <button onClick={()=>setIsOpen(!isOpen)}>😀</button>
        <DropDown open={isOpen} onClose={()=>setIsOpen(false)} items={items} className="flex"/>
    </>
};
