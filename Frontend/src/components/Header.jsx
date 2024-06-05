import { Link, useNavigate } from "react-router-dom";
import ModalContext from "../context/ModalContext";
import { useContext } from "react";

const Header = () => {
    const navigate = useNavigate();
    const { loginStatus, setLoginStatus } = useContext(ModalContext);
    const handleLogout = () => {
        setLoginStatus("");
        localStorage.removeItem("reimburse-user");
        localStorage.removeItem("reimburse-token");
        navigate("/");
    };
    return (
        <div className="flex p-5 justify-between bg-green-950">
            <div className="text-3xl font-bold italic text-green-500">Reimburse</div>
            {!loginStatus ? (
                <div className="flex gap-5">
                    <Link to="/" className="bg-green-500 text-white px-5 py-1 rounded-md">
                        Login
                    </Link>
                    <Link to="/register" className="bg-green-500 text-white px-5 py-1 rounded-md">
                        Register
                    </Link>
                </div>
            ) : (
                <div className="" onClick={handleLogout}>
                    <button className="bg-green-500 text-white px-5 py-1 rounded-md">Logout</button>
                </div>
            )}
        </div>
    );
};
export default Header;
