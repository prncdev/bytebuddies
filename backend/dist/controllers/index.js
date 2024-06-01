"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoc = exports.updateDoc = exports.setDoc = exports.getDoc = exports.deleteUser = exports.updateUser = exports.getMe = exports.logout = exports.loginV2 = exports.login = exports.register = exports.getUsers = exports.getUser = void 0;
var getUser_1 = require("./user/getUser");
Object.defineProperty(exports, "getUser", { enumerable: true, get: function () { return __importDefault(getUser_1).default; } });
var getUsers_1 = require("./user/getUsers");
Object.defineProperty(exports, "getUsers", { enumerable: true, get: function () { return __importDefault(getUsers_1).default; } });
var register_1 = require("./user/register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return __importDefault(register_1).default; } });
var login_1 = require("./user/login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return __importDefault(login_1).default; } });
var login_v2_0_1 = require("./user/login-v2.0");
Object.defineProperty(exports, "loginV2", { enumerable: true, get: function () { return __importDefault(login_v2_0_1).default; } });
var logout_1 = require("./user/logout");
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return __importDefault(logout_1).default; } });
var getMe_1 = require("./user/getMe");
Object.defineProperty(exports, "getMe", { enumerable: true, get: function () { return __importDefault(getMe_1).default; } });
var update_1 = require("./user/update");
Object.defineProperty(exports, "updateUser", { enumerable: true, get: function () { return __importDefault(update_1).default; } });
var delete_1 = require("./user/delete");
Object.defineProperty(exports, "deleteUser", { enumerable: true, get: function () { return __importDefault(delete_1).default; } });
var getDoc_1 = require("./document/getDoc");
Object.defineProperty(exports, "getDoc", { enumerable: true, get: function () { return __importDefault(getDoc_1).default; } });
var createDoc_1 = require("./document/createDoc");
Object.defineProperty(exports, "setDoc", { enumerable: true, get: function () { return __importDefault(createDoc_1).default; } });
var updateDoc_1 = require("./document/updateDoc");
Object.defineProperty(exports, "updateDoc", { enumerable: true, get: function () { return __importDefault(updateDoc_1).default; } });
var deleteDoc_1 = require("./document/deleteDoc");
Object.defineProperty(exports, "deleteDoc", { enumerable: true, get: function () { return __importDefault(deleteDoc_1).default; } });
