//Node-Express server
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();
app.use(express.json());
app.use("/api", graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        
        type RootMutation {
            createEvent(name: String): String
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Miscellaneous', 'Hiking']
        },

        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));


app.listen(3000);
