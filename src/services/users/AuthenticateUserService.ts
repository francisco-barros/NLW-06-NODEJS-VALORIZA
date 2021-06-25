import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

type AuthenticateUserServiceParams = {
  email: string;
  password: string;
};
class AuthenticateUserService {
  async execute({ email, password }: AuthenticateUserServiceParams) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({
      email,
    });
    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }
    const token = sign(
      {
        email: user.email,
      },
      "dc9dfe3cd4eb9aefca61abb167bec200",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return token;
  }
}
export { AuthenticateUserService };
