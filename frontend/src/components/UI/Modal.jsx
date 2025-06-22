import { Children, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";

export default function Modal({children,open,className=""}){
    const dialog=useRef();

    useEffect(()=>{
        const modal=dialog.current;
        if(open){
            modal.showModal();
        }
        return ()=> modal.close();
    },[open])

    return createPortal(
    <dialog ref={dialog} className={className}>
    {children}
    </dialog>,
    document.getElementById("modal")
    );
}