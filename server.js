const express = require('express');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const mongoose=require('mongoose')
const logger=require('./utils/logger')
const indexRouter=require('./routes');

const app = express();

config({ path: "./config/config.env" });


app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('✅ Connected to DB');
    server.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err.message);
  });