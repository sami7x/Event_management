/**
 * Importing required modules
 */
const fs = require("fs");

/**
 * Read Json file
 */
const readJSONFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
};

/**
 * Write Json file
 */
const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing JSON file:", error);
  }
};

module.exports = { readJSONFile, writeJSONFile };
