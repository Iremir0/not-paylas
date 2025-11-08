import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import usersRoute from './routes/users';
import schoolsRoute from './routes/schools';
import departmentsRoute from './routes/departments';
import classesRoute from './routes/classes';
import notesRoute from './routes/notes';
import ratingsRoute from './routes/ratings';
import commentsRoute from './routes/comments';

import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/schools', schoolsRoute);
app.use('/departments', departmentsRoute);
app.use('/classes', classesRoute);
app.use('/notes', notesRoute);
app.use('/ratings', ratingsRoute);
app.use('/comments', commentsRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
