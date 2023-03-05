import {typeDefs} from "./user.schema";
import {userResolvers} from "./user.resolvers";

export const userModule = {typeDefs, resolvers: userResolvers};