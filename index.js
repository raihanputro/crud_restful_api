const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

const PORT = 3001;
dotenv.config();

const user = require('./server/api/user');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Connected');
});

app.use('/user', user);

app.listen(PORT, () => {
    console.log(`Api berjalan pada port ${PORT}`)
});

