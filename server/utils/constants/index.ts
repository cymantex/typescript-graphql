import path from "path";

export const constants = {
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test",
    isTest: process.env.NODE_ENV === "test",
    serverRoot: path.normalize(__dirname + "/../..")
};