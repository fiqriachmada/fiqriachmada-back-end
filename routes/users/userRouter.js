var express = require("express");
const addUserRouter = require("./addUserRouter");
const loginUserRouter = require("./loginUserRouter");
// const addWorkRouter = require("./addWorkRouter");
// const getAllWorkRouter = require("./getAllWorkRouter");
// const getWorkByIdRouter = require("./getWorkByIdRouter");
// const updateWorkByIdRouter = require("./updateWorkByIdRouter");
// const deleteWorkByIdRouter = require("./deleteWorkByIdRouter");

var userRouter = express();

userRouter.use("/user", addUserRouter);

userRouter.use("/user", loginUserRouter);

// userRouter.use("/user", getWorkByIdRouter);

// userRouter.use("/user", updateWorkByIdRouter);

// userRouter.use("/user", deleteWorkByIdRouter);

module.exports = userRouter;
