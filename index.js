require('dotenv').config();

const express = require('express');
const loginRouter = require('./src/Route/login');
const registerUser = require('./src/Route/registro')
const db = require('./src/db/mySql')
const cors = require('cors');
const app = express();
const path = require('path');
const login  = require('./src/controllers/controladores');
const  register  = require('./src/controllers/controladores');

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.set('view engine', 'ejs'); // Configura EJS como motor de vistas
app.set('views', path.join(__dirname, 'views')); // Establece la ruta de las vistas
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter)
app.use('/register', registerUser)


app.listen(PORT, () => {
    console.log(`Puerto escuchando en ${PORT}`);
});

