
const moment = require('moment')
const os = require('os')
const fs = require('fs')
//const nodePromptToolkit = require('node_prompt_toolkit')

moment.locale('es')

console.log( new Date() )

console.log( moment().format('DD [de] MMMM [del] YYYY [a las] h:mm a') )

console.log( os.platform() )

fs.appendFile("nombres.txt", "Alma Rosa\n", function(error, data){
    if(error) {
        console.log("Error al escribir el archivo", error.message)
    }
    else {
        console.log("Archivo escrito correctamente")
    }
})

fs.unlink("nombres.txt", function(error){
    if(error) {
        console.log("Error al borrar el archivo", error.message)
    }
    else {
        console.log("Archivo borrado correctamente")
    }
})

fs.mkdir("./directorio", {recursive: true}, function(error){
    if(error) {
        console.log("Error al crear el directorio", error.message)
    }
    else {
        console.log("Directorio creado correctamente")
    }
})

const nombres = [
    "Alma Rosa",
    "María",
    "José",
    "Juan",
    "Pedro",
    "Luis"
]

fs.writeFile("./directorio/nombres.txt", nombres.join("\n"), function(error){
    if(error) {
        console.log("Error al escribir el archivo", error.message)
    }
    else {
        console.log("Archivo de nombres escrito correctamente")
    }
})