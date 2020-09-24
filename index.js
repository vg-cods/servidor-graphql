const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')

const db_path = './users.json'
const users_db = JSON.parse(fs.readFileSync(db_path))

const resolvers = {

    Query: {
        myname: (root, args, { users_db }) => "M Angel V G",

        users: (root, args, { users_db }) => {
            return users_db
        }
    }

}

const typeDefs = gql`

    type Query { 
        myname: String
        users: [User!]!
    }

    type User {
        id: Int
        firstname: String
        lastname: String
        email: String
        gender: String
    }

` 

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: {
        users_db
    }
})

server.listen(4001).then(() => {
    console.log("servidor corriendo en localhost:4001")
})