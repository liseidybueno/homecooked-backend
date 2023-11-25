"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
async function checkDatabaseConnection() {
    await (0, db_1.connectDB)();
}
checkDatabaseConnection();
//# sourceMappingURL=checkDB.js.map