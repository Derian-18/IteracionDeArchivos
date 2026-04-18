// Importamos los módulos necesarios
const fs = require('fs');
const readline = require('readline');

// Creamos la interfaz para leer desde consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const archivoDatos = 'datos.txt';
const archivoResultado = 'resultado.txt';

let nombres = [];

// Esta es la parte donde agregamos nombres
function pedirNombre() {

    // Si ya tenemos 5 nombres pasamos a guardar
    if (nombres.length >= 5) {
        guardarArchivo();
        return;
    }

    rl.question(`Ingrese nombre ${nombres.length + 1}: `, (nombre) => {

        nombre = nombre.trim();

        // Validación para evitar nombres duplicados
        if (nombres.includes(nombre)) {
            console.log("Ese nombre ya fue ingresado.");
            pedirNombre();
            return;
        }

        nombres.push(nombre);
        pedirNombre();
    });
}

function guardarArchivo() {

    // Guardar nombres separados por salto de línea
    fs.writeFileSync(archivoDatos, nombres.join('\n'));

    console.log("\nArchivo datos.txt creado.\n");

    leerArchivo();
}

function leerArchivo() {

    // Validar si el archivo existe
    if (!fs.existsSync(archivoDatos)) {
        console.log("Error: el archivo datos.txt no existe");
        rl.close();
        return;
    }

    const contenido = fs.readFileSync(archivoDatos, 'utf8');

    // Validamos si está vacio
    if (contenido.trim() === "") {
        console.log("El archivo está vacío");
        rl.close();
        return;
    }

    console.log("Contenido del archivo:");
    console.log(contenido);

    procesarDatos(contenido);
}

function procesarDatos(contenido) {

    // aqui separamos por líneas
    const lista = contenido.split('\n');

    console.log("\nNombres en MAYÚSCULAS:");

    const mayusculas = lista.map(nombre => {
        const upper = nombre.toUpperCase();
        console.log(upper);
        return upper;
    });

    // Cantidad total con el length
    const total = lista.length;

    // Nombre más largo
    let nombreMasLargo = lista.reduce((a, b) =>
        a.length > b.length ? a : b
    );

    // Aqui los ordenamos alfabeticamente
    const ordenados = [...lista].sort();

    console.log("\nTotal de nombres:", total);
    console.log("Nombre con mayor longitud:", nombreMasLargo);

    console.log("\nLista ordenada:");
    console.log(ordenados);

    escribirResultados(lista, mayusculas, ordenados, total);
}

limite = 2
// La nueva funcion para buscar un nombre
function buscarNombre() {
    
    if(limite <= 0){
        console.log("Ya se ejecuto dos veces para la prueba");
        rl.close();
        return;
    }

    rl.question("\nIngrese el nombre a buscar: ", (busqueda) => {

        busqueda = busqueda.trim();

        // Leer archivo
        const contenido = fs.readFileSync(archivoDatos, 'utf8');

        if (contenido.trim() === "") {
            console.log("El archivo está vacío");
            rl.close();
            return;
        }

        const lista = contenido.split('\n');

        let contador = 0;

        // Iterar y contar coincidencias
        lista.forEach(nombre => {
            if (nombre.toLowerCase() === busqueda.toLowerCase()) {
                contador++;
            }
        });

        // Mostrar resultados
        if (contador > 0) {
            console.log(`El nombre "${busqueda}" fue encontrado ${contador} vez/veces.`);
        } else {
            console.log(`El nombre "${busqueda}" NO fue encontrado.`);
        }

        limite--;
        buscarNombre();
    });
}

// Resultados

function escribirResultados(original, mayusculas, ordenados, total) {

    const texto = `
    LISTA ORIGINAL
    ${original.join('\n')}

    LISTA EN MAYÚSCULAS
    ${mayusculas.join('\n')}

    LISTA ORDENADA
    ${ordenados.join('\n')}

    TOTAL DE NOMBRES
    ${total}
    `;

    fs.writeFileSync(archivoResultado, texto);

    console.log("\nArchivo resultado.txt generado.");

    buscarNombre();
}

// Iniciar programa
pedirNombre();