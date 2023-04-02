const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidate = require("./helpers/dataValidation");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (fileName, content) => {
  const data = {
    fileName,
    content,
  };

  const { error } = dataValidate(data);
  if (error) {
    console.log(
      chalk.red(`Please specify ${error.details[0].context.key} parameter!`)
    );
    return;
  }

  const { extension, validatedExtension } = checkExtension(fileName);
  if (!validatedExtension) {
    console.log(
      chalk.red(
        `Sorry, this application doesn't support files with ${extension} extension!`
      )
    );
    return;
  }
  const filePath = path.join(__dirname + "/files", fileName);
  console.log(filePath);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.blue("File created successfully!"));
  } catch (error) {
    console.log(chalk.red(error));
  }
};

const getFiles = async () => {
  const dirPath = path.join(__dirname + "/files");
  const result = await fs.readdir(dirPath);
  if (!result.length) {
    console.log(chalk.red("No files in this directory!"));
    return;
  }
  console.log(result);
  return result;
};

const getFile = async (fileName) => {
  const dirPath = path.join(__dirname + "/files");
  const result = await fs.readdir(dirPath);
  if (!result.includes(fileName)) {
    console.log(chalk.red("No such file in this directory"));
    return;
  }
  const filePath = path.join(__dirname + "/files/" + fileName);
  const file = await fs.readFile(filePath, "utf-8");
  const stats = await fs.stat(filePath);
  console.log({
    name: path.basename(fileName, path.extname(fileName)),
    extension: path.extname(fileName),
    content: file,
    size: stats.size,
    birthDate: stats.mtime,
  });
};

module.exports = { createFile, getFiles, getFile };
