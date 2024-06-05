import { useState } from "react";

const Modal = ({ children }) => {
    return (
        <div className="absolute top-0 left-0 bottom-0 bg-black bg-opacity-70 w-full flex justify-center items-start pt-10">
            <div className="bg-white p-5 rounded-md">{children}</div>
        </div>
    );
};
export default Modal;
