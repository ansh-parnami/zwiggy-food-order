import { Children, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import {AnimatePresence,motion} from "framer-motion";

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
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="modal-content"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    </dialog>,
    document.getElementById("modal")
    );
}