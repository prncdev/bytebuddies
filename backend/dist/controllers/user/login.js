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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Users_1 = __importDefault(require("../../models/Users"));
const Sessions_1 = __importDefault(require("../../models/Sessions"));
const login = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield Users_1.default.findOne({ email });
            if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
                const isSessionExits = yield Sessions_1.default.findOne({ user: user.id });
                if (isSessionExits) {
                    res.status(400);
                    throw new Error('You\'r already logged in');
                }
                const accessToken = yield Sessions_1.default.create({ user: user.id });
                res.status(200).json({ token: accessToken._id });
            }
            else {
                res.status(400);
                throw new Error('Invalid email or password');
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = login;