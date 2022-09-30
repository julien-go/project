import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import router from './routes/router.js';
import session from 'express-session';
import parseurl from 'parseurl';

const app = express();
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true })) 
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(session({
	secret: 'keyboard cat',
	resave:false,
	saveUninitialized: true,
	cookie: {maxAge: 3600000}
}))

app.use( (req, res, next) => {
    res.locals.username = req.session.username || null
    res.locals.isAdmin = req.session.isAdmin || false 
    console.log(res.locals.isAdmin)
    console.log(res.locals.username)
    next();
})

app.use((req, res, next)=>{
    let pathname = parseurl(req).pathname.split('/')
    console.log(pathname);

    let notConnectedPath = ["/api/register","/api/login"];
    let usersPath = ["/api/disconnect"];
    
    //Si aucun user n'est connecté
    if(!req.session.username && usersPath.includes(pathname[1])){
        res.redirect('/');
    } else if (req.session.username && notConnectedPath.includes(pathname[1])){
        res.redirect('/');
    }
    else{
        next();
    }
})

app.use('/', router)

const PORT = process.env.PORT || 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
