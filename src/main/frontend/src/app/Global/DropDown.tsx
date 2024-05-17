
interface DropProps{
    open: boolean;
    onClose: ()=>void;
    items: ListItem[];
    className: string;
}
interface ListItem{
    key:string;
    label:string;
    className: string;
    onClick: ()=>void;
}

const DropDown = ({open, onClose,  items, className}:DropProps ) => {
    if(!open)
        return null;

    return (<div className={"p-2 shadow menu dropdown-content absolute bottom-[47%] z-[10] bg-base-100 rounded-box w-52 "+className}>
        <div className="z-[100] fixed top-0 left-0 right-0 bottom-0" onClick={onClose}></div>
        <ul className="z-[100] flex flex-wrap overflow-y-scroll w-[150px] h-[60px]">
            {items.map((item) => (
                <li key={item.key} className={item.className}>
                    <a className="p-0 m-0 hover:bg-black" onClick={(e) => {e.preventDefault(); item.onClick();} }>{item.label}</a>
                </li>))}
        </ul>
  </div>);
};
export default DropDown;