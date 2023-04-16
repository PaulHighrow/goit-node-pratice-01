const express = require("express");
const fileRouter = express.Router();

const { createFile, getFiles, getFile } = require("./files");

fileRouter.get("/", getFiles);

fileRouter.get("/:fileName", getFile);

fileRouter.post("/", createFile);

module.exports = fileRouter;
