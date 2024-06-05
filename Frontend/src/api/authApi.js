import axios from "axios";
import { SERVER_URL } from "../constants/url";
import { toast } from "react-toastify";

const loginApi = async (payload) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/api/v1/auth/login`, payload);
        localStorage.setItem("reimburse-token", JSON.stringify(data.token));
        localStorage.setItem("reimburse-user", JSON.stringify(data.user));
        toast.success(data.message);
        return data;
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
    }
};

const registerApi = async (payload) => {
    try {
        const { data } = await axios.post(`${SERVER_URL}/api/v1/auth/register`, payload);
        localStorage.setItem("reimburse-token", JSON.stringify(data.token));
        localStorage.setItem("reimburse-user", JSON.stringify(data.user));
        toast.success(data.message);
        return data;
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
    }
};

export { loginApi, registerApi };
