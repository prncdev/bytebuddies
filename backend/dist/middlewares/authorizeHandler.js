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
exports.authorizeHandler = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const authorizeHandler = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let token = null;
        try {
            if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
                const userSession = yield Users_1.default.findOne({ session: token }).select(['-password']);
                if ((userSession === null || userSession === void 0 ? void 0 : userSession.expiresOn) && userSession.expiresOn < new Date()) {
                    console.log('session has expired');
                    userSession.session = undefined;
                    userSession.expiresOn = undefined;
                    yield userSession.save();
                    res.status(403).json({ message: 'Session has expired' });
                    return;
                }
                if (!userSession) {
                    res.status(401).json({ message: 'Unauthorized, no session' });
                    return;
                }
                req.user = userSession;
                next();
            }
            else if (!token) {
                res.status(401).json({ message: 'Unauthorized, no session ID' });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.authorizeHandler = authorizeHandler;
