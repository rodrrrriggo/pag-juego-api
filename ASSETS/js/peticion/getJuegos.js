//API PARA LOS JUEGOS
//18 JUEGOS EN TOTAL

export const getJuegos = async () =>  {
    try{

        const response = await fetch ("https://proyecto-api-cq8j.onrender.com");
        const data = await response.json();

        return data.videojuego;

    }catch(error){

        console.log(`El error es: ${error}`);
    }

    }