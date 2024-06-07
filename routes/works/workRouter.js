var express = require("express");
const addWorkRouter = require("./addWorkRouter");
const getAllWorkRouter = require("./getAllWorkRouter");
const getWorkByIdRouter = require("./getWorkByIdRouter");
const updateWorkByIdRouter = require("./updateWorkByIdRouter");
// const deleteWorkByIdRouter = require("./deleteWorkByIdRouter");

var workRouter = express();

workRouter.use("/work", addWorkRouter);

workRouter.use("/work", getAllWorkRouter);

workRouter.use("/work", getWorkByIdRouter);

workRouter.use("/work", updateWorkByIdRouter);

// workRouter.use("/work", deleteWorkByIdRouter);

module.exports = workRouter;
