//EN ESTA API HAY 3 USUARIOS PREDEFINIDOS PARA PODER INICIAR SESION EN LA PAGINA
//rodrigo guzman rodri123
//nicolas caceres nico1234
//esteban martinez teban1234

export async function getUsuarios() {
    try {
        const response = await fetch('https://proyecto-api-usuarios.onrender.com/');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.usuarios;
    } catch(error) {
        console.error('Error:', error);
        throw error;
    }
}
