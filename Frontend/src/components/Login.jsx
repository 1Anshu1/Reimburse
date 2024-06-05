import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import ModalContext from "../context/ModalContext";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        organization: "",
        department: "",
    });
    const { setLoginStatus } = useContext(ModalContext);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginApi(user);
        console.log(data);
        if (data.user._id) {
            setLoginStatus(data.user);
        }
        data.user.role === "user" ? navigate(`/user/${data.user._id}`) : navigate(`/admin/${data.user._id}`);
    };

    return (
        <div className="mx-[auto] self-center">
            <h1 className="text-3xl text-center mb-5">Login</h1>
            <form className="" onSubmit={handleSubmit}>
                <div className="flex mb-2">
                    <label htmlFor="email" className="w-40">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        className="border border-black"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex mb-2">
                    <label htmlFor="password" className="w-40">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        className="border border-black"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-5 py-1 rounded-md w-full mt-5">
                    Login
                </button>
            </form>
        </div>
    );
};
export default Login;
