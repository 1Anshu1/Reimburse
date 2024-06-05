import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import UserClaimPage from "./pages/UserClaimPage";
import ClaimForm from "./components/ClaimForm";
import ClaimApproalPage from "./pages/ClaimApproalPage";

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                limit={1}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Slide
            />
            <Routes>
                <Route path="/" element={<Homepage />}>
                    <Route path="" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/user/:id" element={<UserClaimPage />} />
                <Route path="/admin/:id" element={<ClaimApproalPage />} />
                {/* <Route path="/test" element={<ClaimForm />} /> */}
            </Routes>
        </BrowserRouter>
    );
};
export default App;
