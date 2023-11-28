"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const Tokens_1 = __importDefault(require("../models/Tokens"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = __importDefault(require("../utils/emails/sendEmail"));
async function resetPassword(email, token, password) {
    let passwordResetToken = await Tokens_1.default.findOne({ where: { userEmail: email } });
    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token.");
    }
    const isValid = await bcrypt_1.default.compare(token, passwordResetToken.token);
    if (!isValid) {
        throw new Error("Invalid or expired password reset token.");
    }
    const currentUser = await Users_1.default.findOne({
        where: {
            email,
        },
    });
    currentUser.password = password;
    currentUser === null || currentUser === void 0 ? void 0 : currentUser.save();
    (0, sendEmail_1.default)(email, "Password Reset Successfully", { name: currentUser === null || currentUser === void 0 ? void 0 : currentUser.firstName }, "src/utils/emails/template/resetPassword.handlebars");
    await passwordResetToken.destroy();
    return true;
}
async function requestPasswordReset(email) {
    const user = await Users_1.default.findOne({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("User does not exist");
    }
    let token = await Tokens_1.default.findOne({
        where: {
            userEmail: email,
        },
    });
    if (token) {
        await token.destroy();
    }
    let resetToken = crypto_1.default.randomBytes(32).toString("hex");
    const hash = await bcrypt_1.default.hash(resetToken, 10);
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + 60 * 60 * 1000);
    await Tokens_1.default.create({
        userEmail: email,
        token: hash,
        expiry: newDate,
    });
    const env = process.env.NODE_ENV || "development";
    const clientURL = env === "development"
        ? process.env.CLIENT_URL_DEV
        : process.env.CLIENT_URL_PROD;
    const link = `${clientURL}/resetPassword?token=${resetToken}&id=${user.email}`;
    try {
        (0, sendEmail_1.default)(email, "Password Reset Request", { name: user.firstName, link: link }, "src/utils/emails/template/requestResetPassword.handlebars");
    }
    catch (error) {
        console.log("Error sending email: ", error);
    }
    return link;
}
exports.default = { requestPasswordReset, resetPassword };
//# sourceMappingURL=authService.js.map