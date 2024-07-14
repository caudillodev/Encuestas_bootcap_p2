# Proyecto 2 Bootcamp UDD - Encuestas
El objetivo del Proyecto 2 es comprender los paradigmas de **Programación Orientada a Objetos** y **Programación Funcional**.
Para lograr los objetivos de aprendizaje, se ha creado un proyecto que permita generar encuestas con sus respectivas opciones e interactuar con el Usuario mediante el Navegador Web para almacenar sus respuestas y posteriormente mostrar los resultados por la consola.

## Programación Orientada a Objetos (POO)
La programación orientada a objetos es un paradigma de programación que organiza el software en **objetos** que interactúan entre sí mediante **métodos** y **propiedades**. Este enfoque facilita la **reutilización**, la **modularidad** y la **estructuración del código** en aplicaciones complejas.
A continuación, la explicación del código ubicado en [/poo/index.js](https://github.com/caudillodev/Encuestas_bootcap_p2/blob/main/poo/index.js):

En el constructor de la clase, se asigan los atributos necesarios para la encuesta. Dejaremos el nulo respuestaUsuario para completar luego con los valores digitados por el Usuario en el navegador.
```javascript
class Encuesta {
    constructor(nombre, pregunta, opciones) {
        this.nombre = nombre;
        this.pregunta = pregunta;
        this.opciones = opciones;
        this.respuestaUsuario = null;
    }
```

- Se asigna la variable opcionesTexto para presentar al usuario las opciones concatenadas con el número de opción.
- Se suma el valor 1 para que opciones no comiencen con el valor 0.
- Mediante la variable respuesta, se despliegan la pregunta y opciones al Usuario para que las digite en el navegador.
- Se obtiene la respuesta y restamos 1 para evitar problemas con la identificación de la opción en el arreglo.
- Evaluamos que la respuesta ingresada sea válida.
- El valor de la respuesta (-1) debe ser mayor a cero y estár dentro del rango del tamaño del arreglo opciones.
- En caso de ser una opción válida, se asigna al atributo respuestaUsuario la posición seleccionada del arreglo opciones.
- En caso de no ingresar una opción válida, retorna falso, para reinisistir al Usuario.

 
En la misma clase, adicionalmente, generamos el método para obtener las respuestas del Usuario:
```javascript
    obtenerRespuesta() {
        return this.respuestaUsuario;
    }
```

 Creamos la clase main con los siguientes métodos y flujo de operaciones:
 - Inicializa la clase crearEncuesta con los arreglos definidos para:nombre de la encuesta, preguntas de la encuesta y las opciones válidas.
 - Valida que las preguntas sean al menos 8
 - Generamos un bucle con FOR, para las instancias de Encuesta en base a la cantidad de encuestas requeridas
 - Generamos un método obtenerEncuestas() para luego obtener las respuestas instanciadas.
 - El método presentarEncuestas permitirá validar que todas las encuestas han sido respondidas satisfactoriamente.
 - Finalmente, con el método registrarResultados desplegaremos todos los resultados en la consola del navegador.

 ```javascript
class EncuestaMain {
    constructor() {
        this.encuestas = [];
    }
    crearEncuestas(n, nombres, preguntas, opciones) {
        if (preguntas.length < 8 || nombres.length < n || opciones.length < n) {
            console.error('Se deben ingresar al menos 8 preguntas para completar la encuesta');
            return;
        }
        for (let i = 0; i < n; i++) {
            let encuesta = new Encuesta(nombres[i], preguntas[i], opciones[i]);
            this.encuestas.push(encuesta);
        }
    }

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
```

