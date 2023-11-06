import { User, Users } from "../models/Users";

async function createUser(user: User) {
  const email = user.email;

  try {
    const getUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (getUser) {
      return true;
    } else {
      await Users.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      return false;
    }
  } catch (error) {
    console.error("Unable to connect", error);
    return false;
  }
}

async function getUser(email: string) {
  try {
    const user = await Users.findOne({
      where: {
        email: email,
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
    console.error("Unable to connect", error);
    return false;
  }
}

export default { createUser, getUser };
