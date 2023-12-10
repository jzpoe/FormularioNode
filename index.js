require('dotenv').config(); 

const express = require('express');
const loginRouter = require('./src/Route/login');
const registerUser = require('./src/Route/resgistro')
const db = require('./src/db/mySql')
const cors = require('cors');
const app = express();
const path = require('path');



const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs'); // Configura EJS como motor de vistas
app.set('views', path.join(__dirname, 'views')); // Establece la ruta de las vistas

app.use(loginRouter)
app.use(registerUser)

app.listen(PORT, () => {
    console.log(`Puerto escuchando en ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index')
})