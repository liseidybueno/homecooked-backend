"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const signupRouter_1 = __importDefault(require("./routers/signupRouter"));
const loginRouter_1 = __importDefault(require("./routers/loginRouter"));
const requestPasswordRouter_1 = require("./routers/requestPasswordRouter");
const db_1 = require("./config/db");
const Users_1 = __importDefault(require("./models/Users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.connectDB)();
Users_1.default.initialize();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (res) => {
    res.send("Hello World From the Typescript Server!");
});
console.log("****index");
app.use("/signup", signupRouter_1.default);
app.use("/login", loginRouter_1.default);
app.use("/requestResetPassword", requestPasswordRouter_1.requestPasswordRouter);
app.use("/resetPassword", requestPasswordRouter_1.resetPasswordRouter);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map