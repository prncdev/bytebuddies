"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    session: { type: String },
    expiresOn: { type: Date }
}, {
    timestamps: true,
});
const Users = (0, mongoose_1.model)('Users', userSchema);
exports.default = Users;
