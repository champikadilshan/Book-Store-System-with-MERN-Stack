import express, { request } from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose, { mongo } from 'mongoose';
import {Book} from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for pasring request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1 : Allow all origins woth default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origns
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET,POST,PUT,DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/',(request, response) => {
    console.log(request)
    return response.status(234).send('Welocme To MERN Stack Tutorial');
});

app.use('/books', bookRoute);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
})