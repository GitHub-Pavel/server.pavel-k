import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
    
    nestApp.setGlobalPrefix('api');
    nestApp.enableCors();

    await nestApp.init();
    
    const expressApp = nestApp.getHttpAdapter().getInstance();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrapServer();
  return server(event, context, callback);
};

if (process.env.NODE_ENV !== 'production') {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
    console.log(`🚀 Application is running on: http://localhost:3000/api`);
  }
  bootstrapLocal();
}
