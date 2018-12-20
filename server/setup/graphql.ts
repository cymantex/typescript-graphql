import graphqlHttp from "express-graphql";
import {buildSchema} from "type-graphql";
import glob from "glob";
import {constants} from "../utils/constants";

const graphql = async (): Promise<graphqlHttp.Middleware> => {
    return graphqlHttp({
        schema: await buildSchema({
            resolvers: glob
                .sync(`${constants.serverRoot}/resolvers/*.ts`)
                .map(resolver => require(resolver).default)
        }),
        graphiql: true,
    });
};

export default graphql;