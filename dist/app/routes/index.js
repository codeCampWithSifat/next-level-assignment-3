"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../modules/users/users.route");
const cow_route_1 = require("../modules/cow/cow.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: users_route_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_route_1.CowRouters,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
