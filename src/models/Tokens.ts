import { sq } from "../config/db";
import { DataTypes, Model } from "sequelize";

export interface TokenAttributes {
  uuid: number;
  userEmail: string;
  token: string;
  expiry: Date;
}

class Token extends Model<TokenAttributes> implements TokenAttributes {
  uuid!: number;
  userEmail!: string;
  token!: string;
  expiry: Date;
}

Token.init(
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sq,
    modelName: "Token",
    tableName: "tokens", // Adjust the table name if needed
    timestamps: true,
  }
);

Token.sync({ alter: true }).then(() => {
  console.log("Token database synced.");
});

export default Token;
