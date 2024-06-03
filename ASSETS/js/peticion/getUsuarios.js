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
