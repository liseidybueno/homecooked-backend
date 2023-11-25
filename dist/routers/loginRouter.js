"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const loginRouter = express_1.default.Router();
loginRouter.post("/", async (req, res) => {
    const user = req.body.user;
    const doesEmailExist = await userController_1.default.getEmail(user.email);
    if (doesEmailExist) {
        const isCorrectPassword = await userController_1.default.checkPassword(user.email, user.password);
        if (isCorrectPassword) {
            res.status(200).send({
                isCorrectEmail: true,
                isCorrectPassword: true,
            });
        }
        else {
            res.status(200).send({
                isCorrectEmail: true,
                isCorrectPassword: false,
            });
        }
    }
    else {
        res.status(200).send({
            isCorrectEmail: false,
        });
    }
});
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map