const express = require('express');
const userRouter = require("./user");
const locationRouter = require("./location");

const router = express.Router();

router.use("/user", userRouter);
router.use("/location", locationRouter);

module.exports = router; 

