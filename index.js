const { createFile, getFiles, getFile } = require("./files");

const express = require("express");
const app = express();
const logger = require("morgan");
const fileRouter = require("./router");

app.use(express.json());
app.use(logger("tiny"));
app.use("/api/files", fileRouter);

app.listen(4000, () => console.log("Listening port 4000, all is ok"));

// function invokeAction({ action, fileName, content }) {
//   switch (action) {
//     case "create":
//       createFile(fileName, content);
//       break;

//     case "get":
//       getFiles();
//       break;

//     case "find":
//       getFile(fileName);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);
