const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user.routes')

const app = express();
const port = 4444;

app.use(cors());
app.use(express.json())
app.use('/api', userRouter)

app.use(express.static('public'))

app.listen(port, (e) => {
    if (e) {
        return console.log(e)
    }
    console.log('Server OK')
})