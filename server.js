const express = require('express');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');



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


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
