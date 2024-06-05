import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { getAllReimburseAdminApi, updateReimburseAdminApi } from "../api/reimburseApi";
import { formatDate } from "../utils/formaDate";

const ClaimApproalPage = () => {
    const { id } = useParams();
    const [approvalRequests, setApprovalRequests] = useState([]);
    const [reimburseUpdate, setReimburseUpdate] = useState({
        // comments: "",
        status: "Pending",
    });

    const handleChange = (e) => {
        setReimburseUpdate({ ...reimburseUpdate, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (id) => {
        const data = await updateReimburseAdminApi(reimburseUpdate, id);
        console.log(data);
        if (data) {
            handleGetFunc();
        }
    };

    const handleGetFunc = () => {
        getAllReimburseAdminApi(id)
            .then((res) => setApprovalRequests(res.claims))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        handleGetFunc();
    }, []);

    return (
        <div className="">
            <Header />
            <div className="px-5 my-5">
                <div className="text-xl font-bold  text-gray-600">Action Pending</div>
                <div className="flex flex-wrap gap-5 justify-start my-5">
                    {approvalRequests
                        ?.filter((item) => item.status === "Pending")
                        .map((item, idx) => (
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
                                    <div className="">Raised Date: {formatDate(item.createdAt)}</div>
                                    {/* <div className="bg-green-500 px-5 py-2 rounded-md text-white w-fit">{"pending"}</div> */}
                                    <div className="">
                                        <label htmlFor="status" className="">
                                            Status:{" "}
                                        </label>
                                        <select
                                            name="status"
                                            id="status"
                                            className="px-4 py-1 border-2 border-green-500 outline-none"
                                            onChange={handleChange}
                                        >
                                            <option value="Pending" className="">
                                                Pending
                                            </option>
                                            <option value="Approved" className="">
                                                Approved
                                            </option>
                                            <option value="Rejected" className="">
                                                Rejected
                                            </option>
                                        </select>
                                    </div>
                                    {/* <div className="">
                                <span className="">Comments: </span>
                                <input type="text" className="" onChange={handleChange} />
                            </div> */}
                                    <button
                                        className="bg-green-500 px-5 py-1 rounded-md text-white"
                                        onClick={() => handleUpdate(item._id)}
                                    >
                                        Update
                                    </button>
                                </div>
                                <div className="">
                                    <img src={item.attachements.secure_url} alt="" className="w-48 h-48" />
                                </div>
                            </div>
                        ))}
                </div>

                <div className="text-xl font-bold  text-gray-600">Action Completed</div>

                <div className="my-5 space-y-2">
                    {approvalRequests
                        ?.filter((item) => item.status !== "Pending")
                        .map((item, idx) => (
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
                                    <div className="">Raised Date: {formatDate(item.createdAt)}</div>
                                    {/* <div className="bg-green-500 px-5 py-2 rounded-md text-white w-fit">{"pending"}</div> */}
                                    <div className="">
                                        <label htmlFor="status" className="">
                                            Status:{" "}
                                        </label>
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
                                    {/* <div className="">
                                <span className="">Comments: </span>
                                <input type="text" className="" onChange={handleChange} />
                            </div> */}
                                    {/* <button
                                    className="bg-green-500 px-5 py-1 rounded-md text-white"
                                    onClick={() => handleUpdate(item._id)}
                                >
                                    Update
                                </button> */}
                                </div>
                                <div className="">
                                    <img src={item.attachements.secure_url} alt="" className="w-48 h-48" />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
export default ClaimApproalPage;
