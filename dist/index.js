"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const Users_1 = require("./models/Users");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (res) => {
    res.send("Hello World From the Typescript Server!");
});
app.post("/signup", async (req, res) => {
    const user = req.body.user;
    const email = user.email;
    try {
        await (0, db_1.connectDB)();
        console.log("Connection has been established");
        const getUser = await Users_1.Users.findOne({
            where: {
                email: email,
            },
        });
        if (getUser) {
            res
                .status(200)
                .json({ userExists: true, message: "This user already exists!" });
        }
        else {
            await Users_1.Users.create({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            });
            res.status(200).json({ userExists: false, user });
        }
    }
    catch (error) {
        console.error("Unable to connect", error);
    }
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map