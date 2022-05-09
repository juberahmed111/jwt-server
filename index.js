const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('this is home page')
});

app.post('/login', (req, res) => {
    const user = req.body;
    console.log(user)
    // DANGER : Do not chekc assword here for serious application
    // use proper process for hashing and checking
    if (user.email === 'user@gmail.com' && user.password === '123456') {
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.send({
            success: true,
            accessToken: accessToken
        })

    }
    else {

        res.send({ success: false })
    }
})
app.listen(port, () => {
    console.log('Listening to port', port);
})
