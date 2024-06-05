import axios from "axios";
import { SERVER_URL } from "../constants/url";
import { toast } from "react-toastify";

const createReimburseApi = async (payload, userId) => {
    try {
        const token = JSON.parse(localStorage.getItem("reimburse-token"));
        const { data } = await axios.post(`${SERVER_URL}/api/v1/claim/${userId}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
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

const getAllReimburseApi = async (userId) => {
    try {
        const token = JSON.parse(localStorage.getItem("reimburse-token"));
        const { data } = await axios.get(`${SERVER_URL}/api/v1/claim/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
    }
};

const getAllReimburseAdminApi = async (userId) => {
    try {
        const token = JSON.parse(localStorage.getItem("reimburse-token"));
        const { data } = await axios.get(`${SERVER_URL}/api/v1/claim/admin/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
    }
};

const updateReimburseAdminApi = async (payload, userId) => {
    console.log(payload);
    try {
        const token = JSON.parse(localStorage.getItem("reimburse-token"));
        const { data } = await axios.put(`${SERVER_URL}/api/v1/claim/admin/${userId}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        if (!error.response) {
            toast.error(error.message);
            throw error;
        }
        toast.error(error.response.data.message);
    }
};

const approveReimburseApi = async () => {};

export {
    createReimburseApi,
    updateReimburseAdminApi,
    getAllReimburseApi,
    getAllReimburseAdminApi,
    approveReimburseApi,
};
