import { sq } from "../config/db";
import { DataTypes, literal } from "sequelize";

export const Users = sq.define("users", {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: literal("gen_random_uuid()"),
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdRecipes: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  savedRecipes: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
});

// Users.sync({ alter: true }).then(() => {
//   console.log("User Model synced");
// });

Users.sync().then(() => {
  console.log("User Model Synced");
});
