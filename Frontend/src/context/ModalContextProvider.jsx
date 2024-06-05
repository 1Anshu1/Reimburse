import { useState } from "react";
import ModalContext from "./ModalContext";

const ModalContextProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [loginStatus, setLoginStatus] = useState(JSON.parse(localStorage.getItem("reimburse-user")));
    return (
        <ModalContext.Provider value={{ showModal, setShowModal, loginStatus, setLoginStatus }}>
            {children}
        </ModalContext.Provider>
    );
};
export default ModalContextProvider;
