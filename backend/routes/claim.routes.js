import express from "express";
import { uploadImage } from "../middlewares/multer.middleware.js";
import { createClaim, getAllClaim, getAllClaimAdmin, updateClaimAdmin } from "../controller/claim.controller.js";
import { authMiddleware, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
    .route("/:userId")
    .post(authMiddleware, uploadImage.single("attachements"), createClaim)
    .get(authMiddleware, getAllClaim);

router.route("/admin/:userId").get(authMiddleware, authorize, getAllClaimAdmin);

router.route("/admin/:claimId").put(authMiddleware, authorize, updateClaimAdmin);
export default router;
