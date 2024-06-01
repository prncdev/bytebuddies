"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docRoutes = exports.userRoutes = void 0;
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
var doc_routes_1 = require("./doc.routes");
Object.defineProperty(exports, "docRoutes", { enumerable: true, get: function () { return __importDefault(doc_routes_1).default; } });
