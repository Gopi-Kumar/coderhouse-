require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin : ['http://localhost:3000']
}));
app.use('/storage', express.static('storage'));


const PORT = process.env.PORT || 5000;
DbConnect();
app.use(express.json({limit: '8mb'}));
app.use(router);

app.get("/", (req,res) => {
    res.send("Hello from express server");
})

app.listen(PORT, ()=> console.log("Listening on port ", PORT));