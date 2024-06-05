import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ModalContext from "../context/ModalContext";
import ClaimForm from "../components/ClaimForm";
import { getAllReimburseApi } from "../api/reimburseApi";
import { formatDate } from "../utils/formaDate";

const UserClaimPage = () => {
    const { id } = useParams();
    const { showModal, setShowModal } = useContext(ModalContext);
    const [raisedClaims, setRaisedClaims] = useState([]);

    const handleRaiseClaim = () => {
        setShowModal(true);
    };

    useEffect(() => {
        getAllReimburseApi(id)
            .then((res) => setRaisedClaims(res.claims))
            .catch((error) => console.log(error));
    }, [showModal]);

    return (
        <div className="relative min-h-screen">
            <Header />
            <button className="bg-green-500 text-white px-5 py-1 rounded-md m-5" onClick={handleRaiseClaim}>
                Raise Claim
            </button>
            {raisedClaims.length === 0 && <div className="mx-5">No reimbursement claim raised</div>}
            <div className="flex flex-wrap gap-5 justify-start px-5 my-5">
                {raisedClaims.map((item, idx) => (
                    <div
                        key={idx}
                        className="basis-[calc(50%-40px)] flex justify-between p-4 border-2 border-green-900 rounded-md"
                    >
                        <div className="font-semibold space-y-2">
                            <div className="flex justify-between">
                                <div className="">
                                    <span className="">Reimburse Id: </span> {item._id}
                                </div>
                            </div>
                            <div className="">
                                <span className="">Amount: </span>
                                {item.amount}
                            </div>
                            <div className="">
                                <span className="">Description: </span>
                                {item.description}
                            </div>
                            {/* <div className="">{"Comments"}</div> */}
                            <div className="">Raised Date: {formatDate(item.createdAt)}</div>
                            {item.approvedDate && (
                                <div className="">Approved Date: {formatDate(item.approvedDate)}</div>
                            )}
                            <div className="">
                                <span className="">Status: </span>
                                <span
                                    className={
                                        item.status === "Pending"
                                            ? "text-yellow-500"
                                            : item.status === "Rejected"
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                        <div className="">
                            <img src={item.attachements.secure_url} alt="" className="w-48 h-48" />
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <ClaimForm />}
        </div>
    );
};
export default UserClaimPage;
