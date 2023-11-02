"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const signUpRouter = express_1.default.Router();
signUpRouter.post("/", async (req, res) => {
    const user = req.body.user;
    const userAdded = await userController_1.default.createUser(user);
    res.status(200).send({ userExists: userAdded });
});
exports.default = signUpRouter;
//# sourceMappingURL=signupRouter.js.map