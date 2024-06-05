import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import ModalContext from "../context/ModalContext";
import { createReimburseApi } from "../api/reimburseApi";
import { toast } from "react-toastify";

const ClaimForm = () => {
    const { id } = useParams();
    const { setShowModal } = useContext(ModalContext);
    const [reimburseForm, setReimburseForm] = useState({
        amount: 0,
        description: "",
        attachements: "",
        organization: JSON.parse(localStorage.getItem("reimburse-user")).organization,
    });
    const [preview, setPreview] = useState();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setReimburseForm({ ...reimburseForm, [e.target.name]: selectedFile });
        previewFile(selectedFile);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setPreview(reader.result);
    };

    const handleChange = (e) => {
        setReimburseForm({ ...reimburseForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!preview) {
            toast.error("attachements missing");
            return;
        }
        const formData = new FormData();
        formData.append("amount", reimburseForm.amount);
        formData.append("description", reimburseForm.description);
        formData.append("attachements", reimburseForm.attachements);
        formData.append("organization", reimburseForm.organization);
        const data = await createReimburseApi(formData, id);
        console.log(reimburseForm);
        if (data) {
            setShowModal(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Modal>
            <div className="text-right font-extrabold cursor-pointer" onClick={handleClose}>
                X
            </div>
            <h1 className="mb-5 text-center text-2xl">Raise Claim Request</h1>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="flex">
                    <label htmlFor="amount" className="w-40">
                        Amount
                    </label>
                    <input
                        id="amount"
                        type="number"
                        name="amount"
                        value={reimburseForm.amount}
                        onChange={handleChange}
                        className="w-full border outline-green-500 p-1"
                    />
                </div>
                <div className="flex">
                    <label htmlFor="description" className="w-40">
                        Description
                    </label>
                    <textarea
                        type="number"
                        id="description"
                        name="description"
                        value={reimburseForm.description}
                        onChange={handleChange}
                        className="w-full h-40 border outline-green-500 p-1"
                    />
                </div>
                <div className="flex">
                    <label htmlFor="attachements" className="w-40">
                        Attachements
                    </label>
                    <input
                        type="file"
                        id="attachements"
                        accept="image/*"
                        name="attachements"
                        className="w-full border outline-green-500 p-1"
                        onChange={handleFileChange}
                    />
                </div>
                {preview && (
                    <img
                        src={preview}
                        alt=""
                        className="h-[200px] w-[200px] overflow-hidden border-2 border-gray-400"
                    />
                )}
                <button className="self-center my-3 bg-green-500 py-1 px-5 rounded-md text-white">Claim Request</button>
            </form>
        </Modal>
    );
};
export default ClaimForm;
