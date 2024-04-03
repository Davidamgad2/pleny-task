import { config } from 'dotenv'
config();
import * as express from "express";
import * as http from "http";
import errorMiddleware from './middlewares/error.middleware';
import mongoose from 'mongoose';
import { intializeBrands } from './utils/validators/brandSchemaValidator';
class App {
  public app: express.Application;
  public server: http.Server;


  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeDataSource();
    this.initializeErrorHandling();
  }

  public listen() {
    this.server = http.createServer(this.app);

    this.server.listen(process.env.PORT ?? 3000, () => {
      console.log(
        `⚡️[server]: Server is running at ${process.env.HOST ?? 'http://localhost'}:${process.env.PORT ?? 3000}`
      );
    });
  }

private initializeMiddlewares() {
    this.app.use(express.json());
}

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeDataSource() {
    mongoose.connect(process.env.MONGO_URL ?? '', {
    }).then(async () => {
      console.log('Connected to database');
      await intializeBrands(mongoose.connection.getClient());
    }).catch((error) => {
      console.error('Error connecting to database', error);

    });
  }

  private async intializeSeeders() {}
}
export default App;
