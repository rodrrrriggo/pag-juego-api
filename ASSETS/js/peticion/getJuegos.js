//API PARA LOS JUEGOS
//18 JUEGOS EN TOTAL
//CIERTAS IMAGENES LAS MUESTRA Y OTRAS NO, YA QUE LOS COMPUTADORES DEL DUOC BLOQUEAN SITIOS DE JUEGOS, PERO EN COMPUTADORES
//PERSONALES NO DEBERIA DE HABER PROBLEMA.

export const getJuegos = async () =>  {
    try{

        const response = await fetch ("https://proyecto-api-cq8j.onrender.com");
        const data = await response.json();

        return data.videojuego;

    }catch(error){

        console.log(`El error es: ${error}`);
    }

    }