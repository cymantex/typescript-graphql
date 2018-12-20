import {expect} from "chai";
import {GraphQLClient} from "graphql-request";
import "../serverTest";
import {requestHost} from "../settings";
import User from "../../entities/User";

const client = new GraphQLClient(`${requestHost}/graphql`);

const fetchUsernames = `{users {username}}`;
const createUser = ({username, password, email}: Partial<User>) => `
    mutation {
        createUser(user: {
            username: "${username}"
            password: "${password}"
            email: "${email}"
        })
    }
`;

describe("UserResolver", () => {
    it("Should get usernames", async () => {
        const response: any = await client.request(fetchUsernames);
        expect(response.users).to.be.an("array");
    });

    it("Should register user", async () => {
        const response: any = await client.request(createUser({
            username: "foo",
            password: "foobarium",
            email: "hello@example.com"
        }));
        expect(response.createUser).to.be.equal("ok");
    });
});