import { bootstrap } from './bootstrap';

async function start() {
  const app = await bootstrap();
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
    console.log(`GraphQL Playground: http://localhost:${process.env.PORT ?? 3000}/graphql`);
  });
}
start();