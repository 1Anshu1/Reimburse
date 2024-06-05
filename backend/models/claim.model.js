import { Schema, Types, model } from "mongoose";
import User from "./user.model.js";

const claimSchema = new Schema(
    {
        amount: {
            type: Number,
            required: [true, "amount is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
        // comments: {
        //     type: "String",
        // },
        attachements: {
            type: {
                public_id: String,
                secure_url: String,
            },
            required: true,
        },
        claimedBy: {
            type: Types.ObjectId,
            ref: User,
            required: [true, "claimed used is required"],
        },
        organization: {
            type: String,
            required: true,
        },
        approvedBy: {
            type: Types.ObjectId,
            ref: User,
        },
        approvedDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Claim = model("Claim", claimSchema);
export default Claim;
