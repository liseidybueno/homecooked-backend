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
    const loginResponse = await userController_1.default.getUser(user.email, user.password);
    res.status(200).send({ loginResponse });
});
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map