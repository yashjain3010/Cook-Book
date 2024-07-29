import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
