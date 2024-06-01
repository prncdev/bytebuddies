"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const documentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Users' },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true,
});
const Documents = (0, mongoose_1.model)('Documents', documentSchema);
exports.default = Documents;
