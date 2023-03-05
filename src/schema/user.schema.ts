import gql from "graphql-tag";

export const typeDefs = gql`
extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@key"])

type User @key(fields: "_id"){
    _id: String
    name: String
    email: String
}
type SignupResponse {
    user: User
    message: String
}
type SigninResponse {
    user: User
    message: String
    token: String
}
type Mutation {
    signup(email: String, name:String, password: String): SignupResponse
    signin(email: String, password: String): SigninResponse
}
`