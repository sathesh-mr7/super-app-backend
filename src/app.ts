import express, { Request, Response, response } from 'express';
import dotenv from 'dotenv';
import { schema, root } from './api/schema';
import { graphqlHTTP } from 'express-graphql';
import { createConnections } from 'typeorm';
import cookieParser from 'cookie-parser';

dotenv.config();
createConnections().then(async connnection => {
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(process.env.API_PATH!, graphqlHTTP((request, response, graphQLParams) => ({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: {
    req: request,
    res: response,
  }
})));

app.listen(parseInt(process.env.APP_PORT!));
const link = `http://localhost:${process.env.APP_PORT!}${process.env.API_PATH}`;
console.log(`Server is run at: ${link}`);

}).catch(error => console.log(error))
