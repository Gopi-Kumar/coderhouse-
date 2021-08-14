requestAnimationFrame('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');


app.use(cookieParser());
const corsOption = {
    credential : true,
    origin : "*",
}
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));


const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({limit: '8mb'}));
app.use(router);

app.get("/", (req,res) => {
    res.send("Hello from express server");
})

app.listen(PORT, ()=> console.log("Listening on port ", PORT));