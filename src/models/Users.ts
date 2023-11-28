import { sq } from "../config/db";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export interface UserAttributes {
  uuid: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdRecipes?: Array<any>;
  savedRecipes?: Array<any>;
}

class User extends Model<UserAttributes> implements UserAttributes {
  uuid!: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdRecipes?: Array<any>;
  savedRecipes?: Array<any>;

  static initialize(): void {
    User.init(
      {
        uuid: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
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
      },
      {
        hooks: {
          beforeCreate: async (user: User) => {
            if (user.password) {
              const salt = bcrypt.genSaltSync(10, "a");
              user.password = bcrypt.hashSync(user.password, salt);
            }
          },
          beforeUpdate: async (user: User) => {
            if (user.password) {
              const salt = bcrypt.genSaltSync(10, "a");
              user.password = bcrypt.hashSync(user.password, salt);
            }
          },
        },
        sequelize: sq,
        modelName: "User",
        tableName: "users",
      }
    );

    if (process.env.NODE_ENV !== "test") {
      User.sync()
        .then(() => {
          console.log("User database synced.");
        })
        .catch((error) => {
          console.error("Error syncing User model:", error);
        });
    }
  }

  validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

export default User;
