const express = require('express');
const router = express.Router();



router.post('/login', async  (req, res) => {
   

    const {email, password} = req.body
    const user = "usuario1"
    const password1 = "password";

    try {
        if( email === user  && password === password1  ){
            res.json({ message: "bienvenido"})
        }else{
            res.json({ message: "usuario o contraseña invalidos" })
        }
   
    } catch (error) {
        console.error('error al iniciar sesion', error)
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
    
    
}
    

)

module.exports = router
