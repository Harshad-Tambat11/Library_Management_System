const express = require('express')

const dotenv = require('dotenv')

//import database from databaseConnectionFile
const DBconnection = require('./databaseConnectionFile');


//import routers from router files
const userRouter = require('./routes/user')
const bookRouter = require('./routes/books')

dotenv.config();

const app = express();

DBconnection();

const PORT = 8081;

app.use(express.json())


app.use('/users', userRouter)
app.use('/books', bookRouter)

app.listen(PORT, ()=> {
    console.log(`server is up and running on http://localhost:${PORT}`)
});

