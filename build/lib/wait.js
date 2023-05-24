"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Pauses the execution of the current async function for the specified amount of time.
 */
function wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
exports.default = wait;
