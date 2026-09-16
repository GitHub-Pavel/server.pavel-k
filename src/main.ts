import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.enableCors();
    await nestApp.init();
    
    const expressApp = nestApp.getHttpAdapter().getInstance();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  cachedServer = cachedServer ?? (await bootstrapServer());
  return cachedServer(event, context, callback);
};

if (process.env.NODE_ENV !== 'production') {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}/`);
  }
  bootstrapLocal();
}
