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
  }

  validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

export default User;

// export interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// export const Users = sq.define(
//   "users",
//   {
//     uuid: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: literal("gen_random_uuid()"),
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdRecipes: {
//       type: DataTypes.ARRAY(DataTypes.JSON),
//     },
//     savedRecipes: {
//       type: DataTypes.ARRAY(DataTypes.JSON),
//     },
//   },
//   {
//     hooks: {
//       beforeCreate: async (user: User) => {
//         if (user.password) {
//           const salt = await bcrypt.genSaltSync(10, "a");
//           user.password = bcrypt.hashSync(user.password, salt);
//         }
//       },
//     },
//   }
// );

// // Users.sync({ alter: true }).then(() => {
// //   console.log("User Model synced");
// // });

// Users.sync().then(() => {
//   console.log("User Model Synced");
// });
