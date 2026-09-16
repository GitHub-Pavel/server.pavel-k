import { bootstrap } from './bootstrap';

async function bootstrapLocal() {
  const app = await bootstrap();
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`🚀 Application is running on: http://localhost:${port}/`);
  });
}

bootstrapLocal();