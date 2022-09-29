import express from 'express'
import session from 'express-session'
import pool from '../config/database.js'
import bcrypt from 'bcrypt';
import registerUser from '../controllers/register.js'
import loginUser from '../controllers/login.js'


const router = express.Router();

router.post("/api/register", registerUser)

router.post("/api/login", loginUser)

export default router;