"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../controllers/userController"));
jest.mock("../../controllers/userController");
describe("Login Router", () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const loginRouter = require("../../routers/loginRouter").default;
    app.use("/login", loginRouter);
    it("should respond with correct email and password", async () => {
        const mockUser = {
            email: "test@example.com",
            password: "password123",
        };
        userController_1.default.getEmail.mockResolvedValueOnce(true);
        userController_1.default.checkPassword.mockResolvedValueOnce(true);
        const response = await (0, supertest_1.default)(app)
            .post("/login")
            .send({ user: mockUser })
            .expect(200);
        expect(response.body).toEqual({
            isCorrectEmail: true,
            isCorrectPassword: true,
        });
    });
    it("should respond with correct email and incorrect password", async () => {
        const mockUser = {
            email: "test@example.com",
            password: "incorrectPassword",
        };
        userController_1.default.getEmail.mockResolvedValueOnce(true);
        userController_1.default.checkPassword.mockResolvedValueOnce(false);
        const response = await (0, supertest_1.default)(app)
            .post("/login")
            .send({ user: mockUser })
            .expect(200);
        expect(response.body).toEqual({
            isCorrectEmail: true,
            isCorrectPassword: false,
        });
    });
    it("should respond with incorrect email", async () => {
        const mockUser = {
            email: "nonexistent@example.com",
            password: "password123",
        };
        userController_1.default.getEmail.mockResolvedValueOnce(false);
        const response = await (0, supertest_1.default)(app)
            .post("/login")
            .send({ user: mockUser })
            .expect(200);
        expect(response.body).toEqual({
            isCorrectEmail: false,
        });
    });
});
//# sourceMappingURL=loginRouter.test.js.map