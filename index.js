const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

import database from "./models/database";
const routes_pages = require('./router/page')
const routes_users = require('./router/users')
const routes_website = require('./router/website.router')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

database.connectDb().then(async () => {
    console.log('Database server is connected...')
    app.listen(3500, () => {
        console.log(`Server listening on port 3000...`)
    })
})

app.get('/', (req, res) => {
    res.status(200).json({
        message: "test"
    });
});

app.use('/pages', routes_pages)
app.use('/users', routes_users)
app.use('/website', routes_website)
