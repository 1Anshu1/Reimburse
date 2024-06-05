import Claim from "../models/claim.model.js";
import asyncWrapper from "../middlewares/asyncWrapper.middleware.js";
import CustomError from "../utils/customError.js";
import { removeFile } from "../utils/removeFile.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

const createClaim = asyncWrapper(async (req, res, next) => {
    const { userId } = req.params;
    const { amount, description, organization } = req.body;

    if (!amount || !description || !organization) {
        throw next(new CustomError(400, "required field is missing"));
    }

    let result = undefined;
    if (req.file && req.file.path) {
        result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "blog",
        });
    }

    const claim = await Claim.create({
        amount,
        description,
        attachements: {
            public_id: result.public_id,
            secure_url: result.secure_url,
        },
        organization,
        claimedBy: req.user.id,
    });

    removeFile(req.file.path);
    res.status(200).json({ message: "reimbursement ticket successfully raised", claim });
});

const updateClaimAdmin = asyncWrapper(async (req, res, next) => {
    const { claimId } = req.params;
    const userId = req.user.id;
    // console.log(claimId);

    const claim = await Claim.findById(claimId);
    if (!claim) {
        throw next(new CustomError(400, "no claim records found"));
    }
    claim.status = req.body.status;
    claim.approvedBy = userId;
    claim.approvedDate = new Date();
    await claim.save();
    res.status(200).json({ message: "update successful", claim });
});

const getAllClaim = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;

    const claims = await Claim.find({ claimedBy: userId }).sort({ createdAt: -1 });
    res.status(200).json({ claims });
});

const getAllClaimAdmin = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const claims = await Claim.find({ organization: user.organization });
    // console.log(claims);
    res.status(200).json({ claims });
});

export { createClaim, getAllClaim, getAllClaimAdmin, updateClaimAdmin };
