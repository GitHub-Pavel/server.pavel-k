import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  return app;
};