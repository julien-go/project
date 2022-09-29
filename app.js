import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import pool from './config/database.js'
import bcrypt from 'bcrypt';

import router from './routes/router.js'

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/', router)


const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
