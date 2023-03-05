import {Resolvers} from "../generated/generatedTypes";

export const userResolvers: Resolvers = {
    Mutation: {
        signup: async (_, args, {dataSources}) => {
            const response = await dataSources.userAPI.signup(args);
            console.log("----------------", response);
            return response;
        },
        signin: async (_, args, {dataSources}) => {
            const response = await dataSources.userAPI.signin(args);
            return response;
        },
    }
}