const User = require('../shared/models/usuario');
const bcrypt = require('bcrypt');
const { generarToken } = require('../shared/utils/jwt');

const loggin = async (req, res) => {
    try {
        const { NombreUsuario, Contrasena } = req.body;

        if (!NombreUsuario || !Contrasena) {
            return res.status(400).json({
                message: 'Nombre de usuario y contraseña son requeridos',
                status: 'error'
            });
        }

        const usuario = await User.findOne({
            where: { NombreUsuario }
        });

        // COMPARACIÓN SIN BCRYPT
        if (!usuario || Contrasena !== usuario.Contrasena) {
            console.log('clave enviada:', Contrasena);
            console.log('clave en bd:', usuario?.Contrasena);

            return res.status(401).json({
                message: 'Credenciales inválidas',
                status: 'error'
            });
        }

        const Tokenwjt = generarToken({
            userId: usuario.id,
            version: "v1"
        });

        const redirec = '/dashboardAdmin';
        
        res.json({
            message: 'Login exitoso',
            status: 'success',
            token: Tokenwjt,
            timestamp: new Date().toISOString(),
            user: {
                id: usuario.id,
                username: usuario.NombreUsuario
            },
            redirec
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            error: 'Error en el login',
            status: 'error'
        });
    }
};

const logout = async (req, res) => {
   const redirec = '/';
    res.json({
        message: 'Cierre de sesion exitoso',
        status: 'success'
    }, redirec);
    
}

module.exports = {
    loggin,logout
}