import express from "express";
import basic from "./basic.routes.js";
import metrics from "./metrics.routes.js";

const router = express.Router();

router.use("/basic", basic);

router.use("/metrics", metrics);

export default router;