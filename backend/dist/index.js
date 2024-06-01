"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const Colors = require("colors.ts");
Colors.colors;
require('dotenv').config();
const express_1 = __importStar(require("express"));
const db_1 = __importDefault(require("./config/db"));
const errorhandle_1 = require("./middlewares/errorhandle");
const routes_1 = require("./routes");
const cors = require("cors");
const path = require("path");
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const dbURL = (_b = process.env.DATABASE_URI) !== null && _b !== void 0 ? _b : "mongodb://localhost:27017/FullStack";
const app = (0, express_1.default)();
(0, db_1.default)(dbURL);
app.use(cors({
    origin: ["https://bytebuddies.netlify.app"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use(routes_1.docRoutes);
app.use(routes_1.userRoutes);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path.join(__dirname, '../../frontend/build')));
    app.use('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'build', 'index.html'));
    });
}
else {
    app.get('/', function (req, res) {
        res.send('We are in development');
    });
}
app.use(errorhandle_1.errorHandler);
app.listen(port, () => console.log('Ctrl + left-click. visit =>'.underline.dim.bold, `http://localhost:${port}/`.green.underline));
