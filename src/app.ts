import { config } from 'dotenv';
config();
import * as express from "express";
import * as http from "http";
import errorMiddleware from './middlewares/error.middleware';
import mongoose, { ConnectOptions } from 'mongoose';
import {intializeBrands}  from './utils/validators/brandSchemaValidator';
import { seedBrands } from './utils/seeders/brands.seeder';
import exportBrandsToExcel from './utils/helpers/excelReport';

class App {
  public app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  public async listen() {
    try {
      await this.initializeDataSource();
      this.server = http.createServer(this.app);
      this.server.listen(process.env.PORT ?? 3000, () => {
        console.log(
          `⚡️[server]: Server is running at ${process.env.HOST ?? 'http://localhost'}:${process.env.PORT ?? 3000}`
        );
      });
    } catch (error) {
      console.error('Server failed to start due to database connection error', error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async initializeDataSource() {
    mongoose.connect(process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/pleny', {
      maxConnecting: 1,
  }).then(async () => {
    console.log('Connected to database');
    await intializeBrands(mongoose.connection.getClient());
    await seedBrands(mongoose.connection);
    await exportBrandsToExcel('brands', mongoose.connection.getClient());
  }
    ).catch((error) => {
      console.error('Error connecting to database', error);
    }
    );
}
}
export default App;
