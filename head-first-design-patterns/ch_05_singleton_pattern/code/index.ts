/**
 * To compile and run this code, cd into the code directory and run the following:
 * tsc ./index.ts --outDir ./build && node ./build/index.js
 */

import { Logger } from "./Logger";

const logger = Logger.getInstance();
logger.configure({ enableLogging: true });
logger.configCheck();
logger.configure({ enableLogging: false });
logger.configCheck();

const logger2 = Logger.getInstance();
console.log("Are logger and logger2 the same object?", logger === logger2);
