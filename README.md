# Graphql API with Apollo server and Mongo DB

## Packages needed

npm i :

- nodemon (if not globally installed)
- express
- mongoose
- dotenv (incuded in nodejs latest version)
- body-parser (if we use expressMiddleware and http server, not needed if we use startStandaloneServer. If we don't use http server, we can use express.json() as usually)
- cors
- graphql
- @apollo/server
- `package.json` do not forget to add **"type":"module"** for ES6 import/export modules.

## Creating an instance of Apollo Server

The first step to create our GraphQL server is to create an instance of Apollo Server, for that, we need to import the `ApolloServer` object and use its constructor. To the constructor we must pass two arguments: our schema (_typeDefs_), and our set of "resolver" functions (_resolvers_).

```javascript
const server = new ApolloServer({
  typeDefs, //-> descriptions of our data types and how they are related with other data types
  resolvers, //-> functions defining how we respond to queries in the graph created by Apollo server
});
```

## About the PORT

There is no default port for GraphQL, although [they use 4000](https://www.apollographql.com/docs/apollo-server/getting-started#step-6-create-an-instance-of-apolloserver) in their official documentation.

We can start our server in any port, but better to avoid using ports reserved for system services and other process from our machine. Those are tipically within the **range 0-1023**.

## Definiton of graph

**graph** refers to the data structure created by Apollo Server to represent the relatioships between the different types of data.

## GQL Schema

We define it with a template literal.`#graphql` tag should give us syntax highlighting if we have installed _GraphQL: Syntax Highlighting_ extension.

Schema (with typeDefs), will define the shape of our data available in our graph. Usually , our gql schema should be very similar to our mongoose schema (thus to the data stored in our DB). THey do not have to match, because GQL is a layer between our DB and client side queries.

[Data Types in GQL](https://www.apollographql.com/docs/apollo-server/schema/schema/#supported-types) :

- `Int` : whole numbers.
- `Float`: decimal numbers.
- `String`.
- `Boolean`.
- `ID` : unique identifier that gql uses as a key for data objects. Similar to MongoDB's `ObjectID`
- We can create our [custom types](https://www.apollographql.com/docs/apollo-server/schema/custom-scalars).

If we want to make a field required, we should use the [_non-null_ operator](https://www.apollographql.com/docs/kotlin/advanced/nonnull/)

```javascript
const typeDefs = gql`
  type SuperHero {
    name: String! // this filed cannot be null
    superpowers: [String]!, // there has to be an array, but can be of null values
    alias: [String!]! // there has to be an array without null values (can be empty though)
  }
  `;
```

- [Query Type](https://www.apollographql.com/docs/apollo-server/schema/schema/#the-query-type): is one of the [_Root operation types_](https://www.apollographql.com/docs/apollo-server/schema/schema/#supported-types). It is not an optional field, and must present in every GQL schema, and defines the entry points to the graph, and define the returns for those entry points.

```javascript
  type Query {
    superheroes: [SuperHero] // returns a list of type SuperHero
    missions: [Mission],
  }
```

- Enum type: we can predefine a [list of values](https://www.apollographql.com/tutorials/side-quest-intermediate-schema-design/02-the-enum-type)

## Resolvers

[Resolvers](https://www.apollographql.com/docs/apollo-server/data/resolvers) are functions which returns the data needed to populate every type defined in the Schema.

First, we should define the resolver functions for `type Query {}` because that **root Query Type** is where we define the entry points to our graph. Therefore we create a function for _every field_ defined in our `type Query {}`. The names of the functions has to match the type name created before.

```javascript
const resolvers = {
  Query: {
    superheroes() {
      return ourMongooseModelforSuperHeroes.find();
    },
    missions() {
      return ourMongooseModelforMissions.find();
    },
  },
};
```

## startStandaloneServer vs expressMiddleware

**expressMiddleware** : creates an express server, as we know it, that allow us to set up our custom CORS options and other configurations.

**StartStandaloneServer** : is a function made by Apollo to help us quickly set up our GraphQL server. It contains some defaul configurations, to make our life easier, but won't allow us to change some of them, e.g. using our own CORS options (by default set with `origin: *`). Under the hood uses `expressMiddleware` to integrate with express.

StartStandaloneServer is a funciton that creates an express app with some default configurations. It might be suitable for most of our use cases, but it won't allow us to do some custom setups like configuring our own CORS policy (setup as "\*" in startStandaloneServer)

## Starting server with expressMiddleware

To start the server using this function, we will need to first apply the method start to the server instance of Apollo server created. Then we create and endpoint, and we pass as second argument the `expressMiddleware` function with the instance of `server` as parameter. Finally, we tell to our express app to `.listen()` to every request coming through the predefined port 4000.

```javascript
await server.start();
app.use("/graphql", expressMiddleware(server));

app.listen(port, () => {
  console.log(`Server is running in port ${port} `);
});
```

Apollo explorer will run in `http://localhost:4000/graphql`.

## Starting server with startStandaloneServer

**->If<-** we wanted to use `StartStandaloneServer` , the setup would be :

```javascript
import { startStandaloneServer } from "@apollo/server/standalone";

//...same server setup

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});
console.log(`Server ready at: ${url}`);
```

Apollo explorer will run in `http://localhost:4000` (no need of `/graphql`)

## Connect with our DB

As we do in our Rest API from our MERN project, we create a (mongoose) schema, and we turn it into a model. The Schema should match almost exactly (in terms of types) the GraphQL Schema.

```javascript
import mongoose from "mongoose";
const superheroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // ... rest of the fields...
});
const superheroModel = mongoose.model("Superheroe", superheroSchema);
export default superheroModel;
```

Our Resolver function will return the values coming from our DB using the mongoose model with a query method.

⚠️Remember⚠️ that every moongoose method is **asynchronous**, therefore our resolver function has to be `async` , and we should `await` for the resolution. A good practise would be to use a `try/catch` block to handle errors.

```javascript
const resolvers = {
  Query: {
    async superheroes() {
      return await superheroModel.find();
    },
};
}
```

## Query with Variables

- **In our Schema:**

  If we want to pass a variable in the query to get single items (a single user, project, ), we need to create a query that requires a variable, the parameter we will use to get that single item (id, name, email... ).

  ```javascript
  const typeDefs = gql`
    # ...previous types

    type Query {
      superheroes: [SuperHero]
      missions: [Mission]
      # queries for single items:
      superhero(id: ID!): SuperHero
      mission(id: ID!): Mission
    }
  `;
  ```

- **In our Resolver:**

  Resolver functions cant take up to 4 arguments: `parent, args, contextValue, info` (in that order).

  - `parent` : refers to the parent resolver. Contains the return value of a parent resolver (the previous resolver in a resolver chain).
  - `args`: arguments,and object containing variables or values sent as argument in the query function.
  - `contextValue`: and object that allos us to share values across all the resolvers. Useful to have acces to tokens when implementing authentication.
  - `info`: object containing information about the state of the operation, such us the fieldname, the path to it, etc...

    If we want to build a resolver function that returns a single element, we need to pass the argument with the value that identifies that element (id, name, etc...) as `args`.

    ```javascript
    const resolvers = {
      Query: {
    // ..previous resolver functions
         async superhero(parent, args) {
             return await superheroModel.findById(args.id);
          },
        };
    }
    ```

    Since we have to keep the order of the arguments, if we do not want to declare unused arguments, we could replace them by underscores (\_).

    ```javascript
    //if we want to skip "parent" argument
     superhero(_, args) { }

    //if we want to skip "parent" and "args" arguments
     superhero(_, __, contextValue) { }
    ```

## Creating relationships between data

In our mongoose schema, we can use populate to build relationships between collections. With GraphQL we can also define those relations in our Schema so Apollo knows which data to display.

First we add the query to our Schema:

```javascript
  type SuperHero {
    id: ID!
    // previous fields...
    assignedMission: Mission!
  }
```

Next, we need to define a new property within the `resolvers` object. The name of this property should match the type name from our GraphQL schema that we want to resolve. Inside this property, we define a resolver function, that should match the name of the field we want to "populate". For example,

```javascript
const typeDefs = gql`
  type User {
    name: String
    userHobby: Hobby
  }

  type Hobby {
    category: String
    description: String
  }

  type Query {
    users: [User]
  }
`;
// to get the information of Hobby inside field userHobby, we need to create a property in the resolver named User , with a function named userHobby

const resolvers = {
  Query: {
    users() {
      return userModel.find();
    },
  },
  User: {
    userHobby(parent) {
      const hobbyID = parent.userHobby;
      return hobbyModel.findById(hobbyID);
    },
  },
};
```

This resolver function gains access to the values returned by the resolver that executed before it, and this parent resolver's output is available through the `parent` parameter.

```javascript
const resolvers = {
  Query: {
    //... previous resolver functions..
    superhero(parent, args, context, info) {
      //... previous logic...
      //-> the value returned here, will be passed in the PARENT argument
    },
  },

  Superhero: {
    async assignedMission(parent) {
      // parent -> contains the object returned in superhero()
      return await missionModel.findById(parent.assignedMission);
    },
  },
};
```

If our Client run this query

```javascript
query($name: String!) {
 superhero(name: $name) {
   name
   assignedMission {
     name
   }
 }
}
```

The resolvers will be resolved in chain : `Query.superheroes() --> Superhero.assignedMission()` , and the values returned in the first resolved resolver (_parent_), will pass to the second resolver.

It is worth to emphasize once more that the GraphQL server acts as an intermediary layer between our client and our database, that means that this relations we can create do not rely on or work independently from relations we stablish thanks to mongoose `.populate()` query. Therefore, these relations created in our `typeDefs` variable, do not require an `ObjectId` type declaration in our mongoose schema.

```javascript
const missionSchema = new mongoose.Schema({
  // assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Superheroe" },
  assignedMission: { type: String }, // this type definition would be enough for our Apollo Graph
});
```

## [Context](https://www.apollographql.com/docs/apollo-server/migration/#context-initialization-function)

It is one of the properties we can pass inside the options object that `expressMiddleware` and `startStandaloneServer` accepts. Defines a function that returns an object that is accesible to every resolver when it is executed. This function accepts the `req` and `res` objects coming from _Express_ (with `startStandaloneServer` they come from the `http` package). This is particularly useful for implementing authentication and managing tokens.

## Mutations

Mutations are operations which _mutate_ data : Create, update, delete.

To create a mutation, first we have to add a new `type Mutation` to our schema. Inside we will define which 1:the kind of mutation/change we want to do, 2:the kind of inputs we need for it., 3: what we want to return when the mutation is completed.

- **Create**

  ```javascript
  const typeDefs = gql`
      type Mutation {
      addSuperhero(newSuperHero: AddSuperheroInput!): Superhero
    }
  ```

  We could've passed every property as an argument to our `addSuperhero(name: String, secretIdentity:String, ...)` , but we can also group them into one type , called **input**.

  An `input` type is an objet that represents the data needed to create a new document in our DB.

  ```javascript
  const typeDefs = gql`
    #........
    input AddSuperheroInput {
      name: String
      secretIdentity: String
      superpowers: [String!]!
    }
  `;
  ```

  Finally , we create a `Mutation:{}` property in our `resolver`, and create the first _Mutation resolver function_ `addSuperhero()`.

  ```javascript
  const resolvers = {
    //...previous code....
    Mutation: {
      async addSuperhero(_, args) {
        const newSuperhero = new superheroModel({
          ...args.newSuperHero, // we can also add properties one by one : name:args.name , secretIdentity: args.secretIdentity, etc...
        });
        return await newSuperhero.save();
      },
    },
  };
  ```

- **Delete**

  ```javascript
  const typeDefs = gql`
    type Mutation {
      #...previous code...
      deleteSuperhero(id: ID!): Superhero
    }
  `;

  const resolvers = {
    //...previous code....
    Mutation: {
      async deleteSuperhero(_, args) {
        return await superheroModel.findByIdAndRemove(args.id);
      },
    },
  };
  ```

  The mutation object property `deleteSuperhero` takes an Id as parameter, and returns the information of the Superhero deleted. The resolver Mutation function `deleteSuperhero` will take the ID inside the `args` object and pass it to our mongoose method.

- **Update**

  For the update, to avoid having to enter every field we want to modify, we will create a new type `input` in our schema, with the fields we want to allow to modify. We will not use the `nonNullable` operator, since we want to be able to choose which fields we want to update with every request.

  ```javascript
  const typeDefs = gql`
    type Mutation {
      #...previous code...
      updateSuperhero(id: ID!, edits: EditSuperheroInput): Superhero
    }

    input EditSuperheroInput {
      secretIdentity: String
      assignedMission: ID
      superpowers: [String]
    }
  `;

  const resolvers = {
    //...previous code....
    Mutation: {
      async updateSuperhero(_, args) {
        return await superheroModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              ...args.edits, // we could also specify here all the potential updates field by field, e.g. secretIdentity : args.edits.secretIdentity
            },
          },
          { new: true }
        );
      },
    },
  };
  ```

## Good Practises for express app

Last but not least, an [alternative way](https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/) of setting up our server, creating an separated HTTP server, and integrating it with our Apollo server.

```javascript
const app = express();

  const httpServer = http.createServer(app); //-> creates an HTTP server
  const myApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], //-> pluggin to integrate Apollo Server with our HTTP server
  });

//...add middlewares

  const port = process.env.PORT || 4000;

  await myApolloServer.start();
  app.use(
    "/graphql",
    expressMiddleware(myApolloServer, {
      context: async ({ req,res }) => { //.... },
    })
  );

  httpServer.listen(port, () => {
    console.log(`server started on ${port}!`);
  });
```

In the our initial setup, our express App creates only an instance of the Apollo Server. The _Apollo server_ will manage both GraphQL requests and HTTP requests.

In this second setup, we create two different servers.

1. One will be our _HTTP Server_, instanciated with `http.createServer(app)`, which will handle HTPP requests.
2. The second will be the _Apollo Server_, to manage just the GraphQL requests.

The plugin _ApolloServerPluginDrainHttpServer_ will allow us to integrate both servers. It will also allow the _Apollo Server_ to control the traffic through our _HTTP server_, closing idle connections, or stoping opened connections when after a specified period of time. This could be quite convinient when working with services such as Websockets

This setpup give us more modularity and a better separation of concerns (the 2 different servers).
