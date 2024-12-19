import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import expressWs from 'express-ws';
import { gameRouter } from './controller/game.routes'; 
import { playerRouter } from './controller/player.routes';
import { socketRouter, mountSocketRouter } from './controller/socket.routes';

dotenv.config();
const expr = express();
const app = expressWs(expr).app;
const port = process.env.APP_PORT || 3000;

mountSocketRouter();

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

app.use('/api/socket', socketRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.name);
    console.log(error.message);
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
