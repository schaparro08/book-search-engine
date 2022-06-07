import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!)
 {
     addUser(username: $username, email: $email, password: $password) {
         token
         user {
             _id
             username
             email
         }
     }
 }`;

 export const SAVE_BOOK = gql`
 mutation saveBook($input: SavedBookInput) {
     savedBook(input: $input) {
         _id
         username
         bookCoount
         savedBooks {
             bookId
             authors
             image
             link
             title
             descripton
         }
     }
 }
 `

 export const LOGIN_USER = gql`


  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        _id
      }
    }
  }
`

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      bookCount

      savedbooks {
          authors
          description
          title
          bookId
          image
          link
      }
    }
  }
`;
