/**
 * @author Rodrigo Espinoza
 * @version 20240714_1
 * @description En base al paradigma de Programación Funcional, se desarrolla un sistema de encuestas que interactúa con el Usuario mediante el navegador Web.
 */

// Crear una encuesta
const crearEncuesta = (nombre, pregunta, opciones) => ({
    nombre,
    pregunta,
    opciones,
    respuestaUsuario: null
});

// Presentar la encuesta y obtener la respuesta del usuario
const responderEncuesta = (encuesta) => {

    //Se asigna la variable opcionesTexto para presentar al usuario las opciones concatenadas con el número de opción.
    //Se suma el valor 1 para que opciones no comiencen con el valor 0.
    const opcionesTexto = encuesta.opciones.map((opcion, index) => `${index + 1}. ${opcion}`).join('\n');

    //Mediante la variable respuesta, se despliegan la pregunta y opciones al Usuario para que las digite en el navegador.
    const respuesta = prompt(`${encuesta.nombre}\n\n${encuesta.pregunta}\n\nOpciones:\n${opcionesTexto}`);

    //Se obtiene la respuesta y restamos 1 para evitar problemas con la identificación de la opción en el arreglo.
    const respuestaIndex = parseInt(respuesta) - 1;

    //Se evalúa que opción digitada por el usuario sea correcta.
    if (respuestaIndex >= 0 && respuestaIndex < encuesta.opciones.length) {

        //En caso de ingresar una opción sea correcta se asigna a encuesta el valor de la propiedad respuestaUsuario 
        //con la posición del arreglo correspondiente a las opciones.
        return { ...encuesta, respuestaUsuario: encuesta.opciones[respuestaIndex] };
    } else {
        
        //En caso de ingresar una opción incorrecta, se re-insiste con el Usuario.
        alert("Respuesta inválida. Inténtalo de nuevo.");
        return responderEncuesta(encuesta);
    }
};

// Crear encuestas
const crearEncuestas = (n, nombres, preguntas, opciones) => {

    //Validar que almenos existan 8 preguntas para las encuestas.
    if (preguntas.length < 8 || nombres.length < n || opciones.length < n) {
        console.error('Se deben ingresar al menos 8 preguntas para completar la encuesta');
        return [];
    }

    return Array.from({ length: n }, (_, i) => crearEncuesta(nombres[i], preguntas[i], opciones[i]));
};

// Presentar todas las encuestas y recoger las respuestas
const presentarEncuestas = (encuestas) => {

    //Con una función flecha, validamos que todas las encuestas estén respondidas para finalizar.
    const encuestasRespondidas = encuestas.map(encuesta => {
        let respondida = false;

        //Se itera con while hasta que tengamos el total de las encuestas respondidas.
        while (!respondida) {
            encuesta = responderEncuesta(encuesta);
            respondida = encuesta.respuestaUsuario !== null;
        }
        return encuesta;
    });

    registrarResultados(encuestasRespondidas);
    alert("Encuestas completadas. Gracias por participar.");
    return encuestasRespondidas;
};

// Registrar los resultados de las encuestas en la consola con función flecha.
const registrarResultados = (encuestas) => {
    console.log("Resultados de las encuestas:");
    encuestas.forEach(encuesta => {
        console.log(`${encuesta.nombre}: ${encuesta.respuestaUsuario}`);
    });
};

// Datos de las encuestas
const nombres = [
    "Encuesta sobre Mascotas",
    "Encuesta sobre Preferencias de Mascotas",
    "Encuesta sobre Cuidado de Mascotas",
    "Encuesta sobre Razas de Mascotas",
    "Encuesta sobre Adopción de Mascotas",
    "Encuesta sobre Alimentación de Mascotas",
    "Encuesta sobre Salud de Mascotas",
    "Encuesta sobre Entretenimiento para Mascotas"
];

//Arreglo con las preguntas
const preguntas = [
    "¿Tienes alguna mascota en casa?",
    "¿Cuál es tu mascota favorita?",
    "¿Qué tipo de cuidados le das a tu mascota?",
    "¿Qué raza de mascota prefieres?",
    "¿Has pensado en adoptar una mascota?",
    "¿Qué alimentación das a tu mascota?",
    "¿Cómo cuidas la salud de tu mascota?",
    "¿Cómo entretienes a tu mascota en casa?"
];

//Arreglo con las opciones disponibles para cada encuesta.
const opciones = [
    ["Sí", "No"],
    ["Perro", "Gato", "Ave", "Reptil", "Roedor"],
    ["Veterinario regular", "Baños frecuentes", "Paseos diarios"],
    ["Labrador Retriever", "Siamés", "Canario", "Iguana"],
    ["Sí", "No, pero estoy considerándolo", "No"],
    ["Alimento seco", "Alimento húmedo", "Dieta especializada"],
    ["Vacunas anuales", "Control de parásitos", "Visitas al veterinario"],
    ["Juguetes interactivos", "Paseos al parque", "Juegos en casa"]
];

// Crear y presentar encuestas
const encuestas = crearEncuestas(8, nombres, preguntas, opciones);
const encuestasRespondidas = presentarEncuestas(encuestas);

// Mostrar las encuestas y las respuestas en la consola
console.log(encuestasRespondidas);