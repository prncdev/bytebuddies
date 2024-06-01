"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose_1 = require("mongoose");
const connectDB = function (URI) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, mongoose_1.connect)(URI);
            console.log('Database conneted on =>'.white.bg_green.bold, `${conn.connection.host}`.magenta.underline);
        }
        catch (error) {
            console.log(`${error}`.bg_red.white.underline);
            process.exit(1);
        }
    });
};
module.exports = connectDB;
