//JS PARA PODER HACER FUNCIONAL EL INICIO DE SESION DE USUSARIOS DE GETUSUARIOS.JS
import { getUsuarios } from './peticion/getUsuarios.js';

document.getElementById('login').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    try {
        const usuarios = await getUsuarios();

        let validUser = usuarios.find(user => user.nombre === username && user.contraseña === password);
        if (validUser) {
            localStorage.setItem('loggedIn', true);
            window.location.href = 'INDEX.HTML';
        } else {
            document.getElementById('loginMessage').textContent = 'Nombre de usuario y/o contraseña incorrectos. Inténtelo de nuevo.';
        }
    } catch (error) {
        document.getElementById('loginMessage').textContent = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
    }
});