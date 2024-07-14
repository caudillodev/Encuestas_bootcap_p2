/**
 * @author Rodrigo Espinoza
 * @version 20240714_1
 * @description En base al paradigma de Programación Orientada a Objetos (POO), se desarrolla un sistema de encuestas que interactúa con el Usuario mediante el navegador Web.
 */

//Se define la clase Encuesta con los métodos asociados a la generaciónde la encuesta.
class Encuesta {
    //En el constructor de la clase, se asigan los atributos necesarios para la encuesta.
    constructor(nombre, pregunta, opciones) {
        this.nombre = nombre;
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.respuestaUsuario = null;
    }

    // Método para presentar la pregunta y obtener la respuesta del usuario
    responderEncuesta() {

        //Se asigna la variable opcionesTexto para presentar al usuario las opciones concatenadas con el número de opción.
        //Se suma el valor 1 para que opciones no comiencen con el valor 0.
        let opcionesTexto = this.opciones.map((opcion, index) => `${index + 1}. ${opcion}`).join('\n');

        //Mediante la variable respuesta, se despliegan la pregunta y opciones al Usuario para que las digite en el navegador.
        let respuesta = prompt(`${this.nombre}\n\n${this.pregunta}\n\nOpciones:\n${opcionesTexto}`);

        //Se obtiene la respuesta y restamos 1 para evitar problemas con la identificación de la opción en el arreglo.
        let respuestaIndex = parseInt(respuesta) - 1;

        //Evaluamos que la respuesta ingresada sea válida.
        //valor de la respuesta (-1) debe ser mayor a cero y estár dentro del rango del tamaño del arreglo opciones.
        if (respuestaIndex >= 0 && respuestaIndex < this.opciones.length) {

            //En caso de ser una opción válida, se asigna al atributo respuestaUsuario la posición seleccionada del arreglo opciones.
            this.respuestaUsuario = this.opciones[respuestaIndex];
            return true;
        } else {

            //En caso de no ingresar una opción válida, retorna falso, para reinisistir al Usuario.
            alert("Respuesta inválida. Inténtalo de nuevo.");
            return false;
        }
    }

    // Método para obtener la respuesta del usuario
    obtenerRespuesta() {
        return this.respuestaUsuario;
    }
}

// Definir la clase principal para las Encuestas
class EncuestaMain {
    constructor() {
        this.encuestas = [];
    }

    //Inicializa la clase crearEncuesta con los arreglos definidos para:
    //nombre de la encuesta, preguntas de la encuesta y las opciones válidas.
    crearEncuestas(n, nombres, preguntas, opciones) {

        //Valida que las preguntas sean al menos 8
        if (preguntas.length < 8 || nombres.length < n || opciones.length < n) {
            console.error('Se deben ingresar al menos 8 preguntas para completar la encuesta');
            return;
        }
        
        //Con este blucle, se crean las instancias de Encuesta en base a la cantidad de encuestas requeridas
        for (let i = 0; i < n; i++) {
            let encuesta = new Encuesta(nombres[i], preguntas[i], opciones[i]);
            this.encuestas.push(encuesta);
        }
    }

    //Método para obtener las encuestas instanciasdas.
    obtenerEncuestas() {
        return this.encuestas;
    }

    // Método para presentar todas las encuestas y recoger las respuestas
    presentarEncuestas() {

        //Mediante este FOR se valida que el total de encuestas instanciadas estén respondidas, caso contrario, se insiste hasta finalizar.
        for (let encuesta of this.encuestas) {
            let respondida = false;
            while (!respondida) {
                respondida = encuesta.responderEncuesta();
            }
        }
        this.registrarResultados();
        alert("Encuestas completadas. Gracias por participar.");
    }

    // Método para registrar los resultados de las encuestas en la consola
    registrarResultados() {
        console.log("Resultados de las encuestas:");
        for (let encuesta of this.encuestas) {
            console.log(`${encuesta.nombre}: ${encuesta.obtenerRespuesta()}`);
        }
    }
}

// Crear instancia de EncuestaMain
const encuestaManager = new EncuestaMain();

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

// Crear encuestas
encuestaManager.crearEncuestas(8, nombres, preguntas, opciones);

// Presentar las encuestas
encuestaManager.presentarEncuestas();

// Obtener y mostrar las encuestas y las respuestas en la consola
console.log(encuestaManager.obtenerEncuestas());