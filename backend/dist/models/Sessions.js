"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Users' },
}, {
    timestamps: true,
});
const Sessions = (0, mongoose_1.model)('Sessions', sessionSchema);
exports.default = Sessions;
