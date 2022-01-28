//import lib express
const express = require("express");
//membuat server
const app = express();
//untuk menjalankan server graphql
const { graphqlHTTP } = require("express-graphql");
//untuk membuat graphql scheme
const { buildSchema } = require("graphql")

//membuat schema untuk data buku
const schema = buildSchema(`
    type Book{
        id: ID!
        title: String!
        author: String!
        isRead: Boolean!
    }
    input BookInputData {
        id: ID!
        title: String!
        author: String!
        isRead: Boolean!
    }
    type RootQuery{
        book: Book!
    }
    type RootMutation{
        addBook(bookInput: BookInputData!) : Book!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

//membuat resolver
const resolver = {
    //resolver get book
    book : () => {
        const bookData = {
            id: "CS001",
            title: "Algoritma",
            author: "Ucup",
            isRead: true
        }
        return bookData;
    },

    //resolver add book
    addBook : ({ bookInput }) => {
        const createdBook = {
            id: bookInput.id,
            title: bookInput.title,
            author: bookInput.author,
            isRead: bookInput.isRead
        };
        return createdBook;
    }
}

//run server dg graphql
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

//run server on port 3000
app.listen(3000, () => {
    console.log("Server started");
});