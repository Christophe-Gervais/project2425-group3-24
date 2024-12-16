import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { gameRouter } from './controller/game.routes'; 
import { playerRouter } from './controller/player.routes';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Game and Player API',
            version: '1.0.0',
            description: 'This is an API to manage players and games.',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./controller/game.routes.ts', './controller/player.routes.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/api/game', gameRouter); 
app.use('/api/player', playerRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.name);
    console.log(error.message);
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
