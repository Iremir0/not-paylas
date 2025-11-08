import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import usersRoute from './routes/users.js';
import schoolsRoute from './routes/schools.js';
import departmentsRoute from './routes/departments.js';
import notesRoute from './routes/notes.js';
import ratingsRoute from './routes/ratings.js';
import commentsRoute from './routes/comments.js';

import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/schools', schoolsRoute);
app.use('/departments', departmentsRoute);
app.use('/notes', notesRoute);
app.use('/ratings', ratingsRoute);
app.use('/comments', commentsRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
