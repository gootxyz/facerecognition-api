import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import {PORT} from './config.js';
import {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} from './config.js'


//Controllers
import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleImage } from './controllers/image.js';

//Connecting the server to a PSQL database 
const db = knex({
    client: 'pg',
    connection: {
        host : DB_HOST,
        port : DB_PORT,
        user : DB_USER,
        password : DB_PASSWORD,
        database : DB_NAME
    }
});

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ], 

    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.use(express.json());
app.use(cors());

// HOME ROUTE
app.get('/', (req, res) => {
    res.send("Success!");
})

// SIGNIN
app.post('/signin', (req,res)=> {handleSignIn(req,res,db,bcrypt)})
 // REGISTER
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})
//PROFILE ID
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})
// IMAGE UPDATE
app.put('/image', (req, res) => {handleImage(req, res, db)})

app.listen(PORT, ()=>{
    console.log(`Working in PORT ${PORT} :)`);
})