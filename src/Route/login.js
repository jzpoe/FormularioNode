const express = require("express");
const bcrypt = require("bcrypt");

const {Renderlogin} = require("../controllers/controladores");
const connection = require("../db/mySql");
const router = express.Router();


router.get('/', Renderlogin)
router.post("/", async (req, res) => {
    const data = req.body;
    console.log(data);
  const { email, password } = req.body;
  

  try {
    if (!email && !password ) {
      res.json({ message: "nombre o usuario incorrectos" });
    } 

    const query = 'SELECT * FROM registro WHERE email = ?'
    connection,query = (query, [email], async (err, rows)=>{
      if (err) {
        console.error('error al consultar la base de datos', err);
        return res.status(500).json({ error: "Error al iniciar sesión" });
      }
    })

    if (rows.lenght === 0){
      res.status(404).json({ message: "usuario no encontrado" });
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
      return res.status(404).json({ message: "contraseña incorrecto" });
    }

    res.json({ message:"inicio de sesion correcto" });

  } catch (error) {
    console.error("error al iniciar sesion", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});



module.exports = router;
