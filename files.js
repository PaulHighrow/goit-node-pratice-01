const fs = require("fs/promises");
const path = require("path");

const dataValidate = require("./helpers/dataValidation");
const checkExtension = require("./helpers/checkExtension");

// get
const getFiles = async (__, res) => {
  try {
    const dirPath = path.join(__dirname + "/files");
    const result = await fs.readdir(dirPath);
    if (!result.length) {
      return res.status(404).json({ message: "No files in this directory!" });
    }
    return res.json({ message: "Success", files: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// post
const createFile = async (req, res) => {
  const { fileName, content } = req.body;

  const { error } = dataValidate({ fileName, content });
  if (error) {
    res.status(400).json({
      message: `Please specify ${error.details[0].context.key} parameter!`,
    });
    return;
  }

  const { extension, validatedExtension } = checkExtension(fileName);
  if (!validatedExtension) {
    res.status(400).json({
      message: `Sorry, this application doesn't support files with ${extension} extension!`,
    });
    return;
  }

  try {
    const filePath = path.join(__dirname + "/files", fileName);
    await fs.writeFile(filePath, content, "utf-8");
    res.status(201).json({ message: "File created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// getbyname
const getFile = async (req, res) => {
  const { fileName } = req.params;
  const dirPath = path.join(__dirname + "/files");
  try {
    const result = await fs.readdir(dirPath);
    if (!result.includes(fileName)) {
      res.status(404).json({
        message: "No such file in this directory",
      });
      return;
    }
    const filePath = path.join(__dirname + "/files/" + fileName);
    const file = await fs.readFile(filePath, "utf-8");
    const stats = await fs.stat(filePath);
    res.json({
      name: path.basename(fileName, path.extname(fileName)),
      extension: path.extname(fileName),
      content: file,
      size: stats.size,
      birthDate: stats.mtime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createFile, getFiles, getFile };
