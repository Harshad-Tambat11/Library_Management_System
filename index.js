const express = require('express')

const {users} = require('./data/users.json')

const userRouter = require('./routes/user')

const bookRouter = require('./routes/books')

const app = express()

const PORT = 8081;

app.use(express.json())


app.use('/users', userRouter)
app.use('/books', bookRouter)

app.listen(PORT, ()=> {
    console.log(`server is up and running on http://localhost:${PORT}`)
});

