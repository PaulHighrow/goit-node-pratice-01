const path = require("path");

const checkExtension = (fileName) => {
  const EXTENSIONS = ["js", "json", "txt", "html", "xml", "css"];

  return {
    extension: fileName.slice(fileName.lastIndexOf(".") + 1),
    validatedExtension: EXTENSIONS.includes(
      fileName.slice(fileName.lastIndexOf(".") + 1)
    ),
  };
};

module.exports = checkExtension;
