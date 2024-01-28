"use strict";
/**
 * To compile and run this code, cd into the code directory and run the following:
 * tsc ./index.ts --outDir ./build && node ./build/index.js
 */
exports.__esModule = true;
var Logger_1 = require("./Logger");
var logger = Logger_1.Logger.getInstance();
logger.configure({ enableLogging: true });
logger.configCheck();
logger.configure({ enableLogging: false });
logger.configCheck();
var logger2 = Logger_1.Logger.getInstance();
console.log("Are logger and logger2 the same object?", logger === logger2);
