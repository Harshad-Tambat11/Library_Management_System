const express = require('express')

const app = express()

const PORT = 8081;

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "home-page"
})


})
app.listen(PORT, ()=> {
    console.log(`server is up and running on http://localhost:${PORT}`)
})