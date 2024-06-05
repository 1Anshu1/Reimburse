import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi";
import ModalContext from "../context/ModalContext";

const Register = () => {
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
        const data = await registerApi(user);
        if (data.user._id) {
            setLoginStatus(data.user);
        }
        data.user.role === "user" ? navigate(`/user/${data.user._id}`) : navigate(`/admin/${data.user._id}`);
    };

    return (
        <div className="mx-[auto] self-center">
            <h1 className="text-center text-2xl mb-5">Register</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex ">
                    <label htmlFor="name" className="w-40">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        className="border border-black"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
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
                <div className="flex">
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
                <div className="flex">
                    <label htmlFor="organization" className="w-40">
                        Oragnization
                    </label>
                    <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={user.organization}
                        className="border border-black"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <label htmlFor="department" className="w-40">
                        Department
                    </label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={user.department}
                        className="border border-black"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-5 py-1 rounded-md">
                    Register
                </button>
            </form>
        </div>
    );
};
export default Register;
