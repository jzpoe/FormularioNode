const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../db/mySql'); // Ajusta la ruta según tu estructura de archivos

const router = express.Router();

router.post('/registro', async (req, res) => {
  console.log(req.body);
  const { nombre, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await checkUserExists(email);

    if (existingUser) {
      return res.status(400).json({ message: `El usuario ${email} ya existe` });
    }

    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el nuevo usuario en la base de datos
    const result = await insertUser(nombre, email, hashedPassword);

    // Puedes retornar el ID del usuario recién registrado u otra información
    res.json({ message: 'Usuario creado con éxito', userId: result.insertId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Función para verificar si un usuario ya existe
async function checkUserExists(email) {
  const query = 'SELECT * FROM registro WHERE email = ?';
  const [rows] = await connection.execute(query, [email]);
  return rows.length > 0;
}

// Función para insertar un nuevo usuario en la base de datos
async function insertUser(nombre, email, hashedPassword) {
  const query = 'INSERT INTO registro (nombre, email, password) VALUES (?, ?, ?)';
  const [result] = await connection.execute(query, [nombre, email, hashedPassword]);
  return result;
}

module.exports = router;