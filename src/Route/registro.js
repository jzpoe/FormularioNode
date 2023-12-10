const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../db/mySql"); // Ajusta la ruta según tu estructura de archivos
const { Renderregister } = require("../controllers/controladores");

const router = express.Router();

router.get('/', Renderregister)

router.post("/", async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    console.log(req.body);

    console.log();
    return res.status(400).json({ error: "Faltan datos en el formulario" });
  }

  try {
    console.log("Password antes de hash:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password después de hash:", hashedPassword);

    const result = ({nombre: nombre,email:email, hashedPassword:hashedPassword});
    console.log(result)

    connection.query('INSERT INTO registro SET ?', [result], (err, rows) => {
      if (err) {
          console.error("Error al insertar en la base de datos:", err);
          return res.status(500).json({ error: "Error al insertar en la base de datos" });
      }
      res.json({ message: "Usuario creado con éxito"});
   });

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

module.exports = router;


