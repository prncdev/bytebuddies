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
const register = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, age, gender, email, password } = req.body;
            if (!name || !email || !password || !age || !gender) {
                res.status(400);
                throw new Error('Please provide all the neccessary fields');
            }
            const userExist = yield Users_1.default.findOne({ email });
            if (userExist) {
                res.status(400);
                throw new Error('Email already in use');
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            const UUID = crypto.randomUUID();
            const session = (yield bcryptjs_1.default.genSalt(10)) + '--' + UUID;
            const expiresOn = new Date();
            expiresOn.setHours(expiresOn.getHours() + 24);
            const user = yield Users_1.default.create({
                name,
                age,
                gender,
                email,
                password: hashedPassword,
                session,
                expiresOn,
            });
            if (user) {
                res.status(201).json({
                    name: user.name,
                    email: user.email,
                    token: user.session
                });
            }
            else {
                res.status(500).json({ message: 'Something went wrong.' });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = register;
