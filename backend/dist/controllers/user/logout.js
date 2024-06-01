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
const Users_1 = __importDefault(require("../../models/Users"));
const logout = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let token = null;
        try {
            if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
                const user = yield Users_1.default.findOne({ session: token });
                if (user) {
                    user.session = undefined;
                    user.expiresOn = undefined;
                    yield user.save();
                    res.status(200).json({ token });
                }
                else {
                    res.status(400);
                    throw new Error('Not logged in');
                }
            }
            else if (!token) {
                res.status(401);
                throw new Error('unauthorized, no token');
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = logout;
