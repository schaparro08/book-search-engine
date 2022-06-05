const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID!
    bookId: String
    authors:[String]
    description: String
    image: String
    link: String
    title: String
}
input savedBooks {
    description: String
    link: String
    title: String
    image: String
    bookId: String
    authors: [String]
}
type Auth {
    token: ID!
    user: User
  }

  type Query {
      users: [User]!
      user(userId: ID!): User
      me:User
  }

  type Mutation {
      addUsers(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth

      saveBook(input:savedBooks!): User
      removeBook(bookId: ID!): User
  }

`;


module.exports = typeDefs;