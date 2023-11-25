"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("../utils/emails/sendEmail"));
const nodemailer = __importStar(require("nodemailer"));
jest.mock("nodemailer");
describe("sendEmail function", () => {
    it("should send an email successfully", async () => {
        const mockedCreateTransport = nodemailer.createTransport;
        const mockedSendMail = jest.fn();
        mockedCreateTransport.mockReturnValue({
            sendMail: mockedSendMail.mockResolvedValueOnce({
                accepted: ["liseidybueno@gmail.com"],
                rejected: [],
                messageId: "mocked-message-id",
            }),
        });
        const result = await (0, sendEmail_1.default)("liseidybueno@gmail.com", "Test Subject", { name: "Liseidy" }, "src/utils/emails/template/requestResetPassword.handlebars");
        expect(mockedSendMail).toHaveBeenCalledWith({
            from: "liseidybueno@gmail.com",
            to: "liseidybueno@gmail.com",
            subject: "Test Subject",
            html: expect.stringContaining("Hi Liseidy"),
        });
        expect(result).toBe("Email sent successfully");
    });
    it("should not send an email successfully", async () => {
        const mockedCreateTransport = nodemailer.createTransport;
        const mockedSendMail = jest.fn();
        mockedCreateTransport.mockReturnValue({
            sendMail: mockedSendMail.mockResolvedValueOnce(undefined),
        });
        const result = await (0, sendEmail_1.default)("liseidybueno@gmail.com", "Test Subject", { name: "Liseidy" }, "src/utils/emails/template/requestResetPassword.handlebars");
        expect(mockedSendMail).toHaveBeenCalledWith({
            from: "liseidybueno@gmail.com",
            to: "liseidybueno@gmail.com",
            subject: "Test Subject",
            html: expect.stringContaining("Hi Liseidy"),
        });
        expect(result).toBe("Email not sent");
    });
});
//# sourceMappingURL=sendEmail.test.js.map