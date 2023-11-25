import User, { UserAttributes } from "../models/Users";
import bcrypt from "bcrypt";

async function createUser(user: User) {
  const email = user.email;

  try {
    const getUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (getUser) {
      return true;
    } else {
      await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      } as UserAttributes);
      return false;
    }
  } catch (error) {
    console.error("Unable to connect", error);
    return false;
  }
}

async function getEmail(email: string) {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error retrieving user", error);
    return false;
  }
}

async function checkPassword(email: string, password: string) {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return bcrypt.compareSync(password, user.password);
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error retrieving user", error);
    return false;
  }
}

async function getUser(email: string) {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return {
        canLogin: true,
        user,
      };
    } else {
      return {
        canLogin: false,
        errorMsg:
          "This user does not exist. Please sign up or try another email address.",
      };
    }
  } catch (error) {
    console.error("Error retrieving user", error);
    return {
      canLogin: false,
      errorMsg: "An error occurred while retrieving the user.",
    };
  }
}

export default { createUser, getUser, getEmail, checkPassword };
