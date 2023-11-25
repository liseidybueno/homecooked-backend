"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const googleapis_1 = require("googleapis");
dotenv_1.default.config();
const sendEmail = async (email, subject, payload, template) => {
    try {
        const OAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
        OAuth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        });
        let accessToken;
        try {
            accessToken = await OAuth2Client.getAccessToken();
        }
        catch (error) {
            throw new Error("Could not get access token.");
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: "liseidybueno@gmail.com",
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const filePath = path_1.default.join(process.cwd(), template);
        const source = fs_1.default.readFileSync(filePath, "utf-8");
        const compiledTemplate = handlebars_1.default.compile(source);
        const options = {
            from: "liseidybueno@gmail.com",
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        };
        const info = await transporter.sendMail(options);
        if (info) {
            return "Email sent successfully";
        }
        else {
            throw new Error("Email not sent");
        }
    }
    catch (error) {
        return error.message;
    }
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map