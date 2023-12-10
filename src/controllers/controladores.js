
function Renderlogin (req, res){
    res.render('login')
}

function Renderregister (req, res) {
    res.render('register')
}


module.exports = {
    Renderlogin,
    Renderregister,
    
}