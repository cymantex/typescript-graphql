import {Arg, Mutation, Query, Resolver} from "type-graphql";
import User from "../entities/User";
import bcrypt from "bcrypt";

@Resolver(() => User)
export default class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find();
    }

    @Mutation(() => String)
    async createUser(@Arg("user", () => User) user: User): Promise<string> {
        if(await User.findOne(user.username)){
            throw new Error(`A user with the name of ${user.username} already exists`);
        }

        const newUser = User.create(user);
        await newUser.save();
        return "ok";
    }

    @Mutation(() => String)
    async removeUser(@Arg("username", () => String) username: string): Promise<string> {
        const user = await User.findOne(username);
        await User.remove(user);
        return "ok";
    }

    @Mutation(() => String)
    async updateUser(@Arg("user", () => User) user: User): Promise<string> {
        const updatedUser = (user.password)
            ? {...user, password: await bcrypt.hash(user.password, 10)}
            : user;

        await User.update(user.username, updatedUser);
        return "ok";
    }
}