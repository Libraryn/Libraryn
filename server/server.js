const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./routes/routes')

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router);

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

app.listen(5555, console.log('listening on port 5555'));