import {ReactNode} from "react";
interface DropProps{
    open: boolean;
    onClose: ()=>void;
    children: ReactNode;
    className: string;
}
// items: ListItem[];
// interface ListItem{
//     key:string;
//     label:string;
//     className: string;
//     onClick: ()=>void;
// }

const DropDown = ({open, onClose, children, className}:DropProps ) => {
    if(!open)
        return null;

    return (<div className={"p-2 shadow menu dropdown-content absolute z-[10] "+className}>
           {children}
  </div>);
};
export default DropDown;