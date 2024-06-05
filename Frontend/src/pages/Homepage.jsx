import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import banner1 from "../assets/banner1.svg";

const Homepage = () => {
    return (
        <div className="h-full w-full">
            <Header />
            <div className="flex h-screen">
                <div className="bg-teal-500 basis-[50%]">
                    <img src={banner1} alt="" />
                </div>
                <Outlet />
            </div>
        </div>
    );
};
export default Homepage;
