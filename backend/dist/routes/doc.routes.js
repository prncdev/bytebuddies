"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const authorizeHandler_1 = require("../middlewares/authorizeHandler");
const routers = (0, express_1.Router)();
routers.route('/document').get(authorizeHandler_1.authorizeHandler, controllers_1.getDoc).post(authorizeHandler_1.authorizeHandler, controllers_1.setDoc);
routers.route('/document/:id').delete(authorizeHandler_1.authorizeHandler, controllers_1.deleteDoc).put(authorizeHandler_1.authorizeHandler, controllers_1.updateDoc);
exports.default = routers;
