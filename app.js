import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import router from './routes/router.js';
import middleware from './controllers/middleware.js'

const app = express();
app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true })) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(middleware)

app.use('/', router)

const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
