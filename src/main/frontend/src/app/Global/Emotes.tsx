import DropDown from "@/app/Global/DropDown";

export const emoteList = ['😁','😂','🤣','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','🙂','🤗','🤩'];
interface EmoteDropDownProps{
    open:boolean;
    setIsOpen: (v:boolean) => void;
    input_id:string;
    position?:string;
    onClick?: (item:string)=>void;
}
export function EmoteDropDown(info:EmoteDropDownProps){

    const items = [];
    for(let i=0; i<emoteList.length;i++){
        const handler = () => {const input = document.getElementById(info.input_id) as HTMLInputElement; input.value = input.value + emoteList[i]; info.onClick?.(emoteList[i]);};
        items.push({key:emoteList[i],label: emoteList[i], className: 'flex flex-wrap w-[20px]', onClick: handler});
    }
      
    return <>
        <DropDown open={info.open} onClose={()=>info.setIsOpen(false)} className={"flex border rounded-box w-52 bg-base-100 " + (info.position?info.position:'')}>
            <div className="z-[100] fixed top-0 left-0 right-0 bottom-0" onClick={()=>info.setIsOpen(false)}></div>
            <ul className="z-[100] flex flex-wrap overflow-y-scroll w-[150px] h-[60px]">
            {items.map((item) => (
                <li key={item.key} className={item.className}>
                <a className="p-0 m-0 hover:bg-black" onClick={(e) => {e.preventDefault(); item.onClick();} }>{item.label}</a>
            </li>))}
            </ul>
        </DropDown>
    </>
};
interface ButtonProps{
    open:boolean;
    setIsOpen: (v:boolean) => void;
}
export function EmoteButton(info:ButtonProps){
    return <><button onClick={()=>info.setIsOpen(!info.open)}>😀</button></>;
}