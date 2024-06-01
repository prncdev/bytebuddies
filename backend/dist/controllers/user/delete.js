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
const deleteUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Users_1.default.findById(req.params.id);
            if (!user) {
                res.status(404);
                throw new Error("Can't delete the user, invalid ID");
            }
            const deletedUser = yield Users_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json({ id: deletedUser === null || deletedUser === void 0 ? void 0 : deletedUser._id, name: deletedUser === null || deletedUser === void 0 ? void 0 : deletedUser.name });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = deleteUser;
