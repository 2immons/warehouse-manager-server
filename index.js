const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');

const userRouter = require('./routes/user.routes')
const productRouter = require('./routes/products.routes')
const logsRouter = require('./routes/logs.routes')
const orderRouter = require('./routes/order.routes')
const detailRouter = require('./routes/detail.routes')
const agentRouter = require('./routes/agent.routes')
const datesRouter = require('./routes/dates.routes')
const documentRouter = require('./routes/document.routes')
const settingsRouter = require('./routes/settings.routes')

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = 4444;

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
  };
app.use(cookieParser())
app.use(cors(corsOptions));
app.use(express.json())

app.use('/api', userRouter)

app.use('/api', authMiddleware);

app.use('/api', productRouter)
app.use('/api', logsRouter)
app.use('/api', orderRouter)
app.use('/api', detailRouter)
app.use('/api', agentRouter)
app.use('/api', datesRouter)
app.use('/api', documentRouter)
app.use('/api', settingsRouter)


app.use(express.static('public'))

app.listen(port, (e) => {
    if (e) {
        return console.log(e)
    }
    console.log('Server started: http://localhost:4444')
})