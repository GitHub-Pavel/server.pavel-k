import { bootstrap } from './src/bootstrap';

export default async function handler(req: Request, res: Response) {
    const app = await bootstrap();
    await app.init();
    return app.getHttpAdapter().getInstance()(req, res);
};