import express from 'express'

import linkedin from './src/routers/linkedin.js'
import google from './src/routers/google.js'
import github from './src/routers/github.js'
import { secretKeys } from './src/config/secretKeys.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/linkedin', linkedin)
app.use('/api/v1/google', google)
app.use('/api/v1/github', github)


app.listen(process.env.SERVER_PORT, () => {
    console.log('Server is listening on port ' + secretKeys.SERVER_PORT);
});