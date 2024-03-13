//Semana 14

const moment = require('moment');

moment.locale('es');

console.log("Hola desde nodejs")

console.log( moment().format('MMMM Do YYYY, h:mm:ss a') )

// Datos de la API de Banxico
const APIBanxico = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/"
const tokenBanxico = "58d4a0fbbc5edcd977f90d7cccdb3c25c9091d86299fd9be7cbebe53ddeaa6d1"
const operacionUSDtoMXN = "SF43787"
const path = "datos/oportuno"

// Función para obtener el precio del dólar desde la API de Banxico
async function obtenerPrecioDolar() {
    const response = await fetch(`${APIBanxico}/${operacionUSDtoMXN}/${path}`, {
        headers: {
            'Bmx-Token': tokenBanxico
        }
    })
    const data = await response.json()

    return data.bmx.series[0].datos[0].dato
}

// Función para cambiar de dólares a pesos mexicanos sin usar funcion asincrona
function cambiarAPesosMexicanos(montoEnUSD) {
    let precioFinal = null

    setTimeout( function(precioDolar) {
        precioFinal = montoEnUSD * precioDolar
        return precioFinal
    } , 500, 17 )

    return precioFinal
}

// Función para cambiar de dólares a pesos mexicanos usando promesas
async function cambiarAPesosMexicanosAsincrona(montoEnUSD) {
    return new Promise( (resolve) => {
        setTimeout( function(precioDolar) {
            let precioFinal = montoEnUSD * precioDolar
            resolve( precioFinal )
        } , 500, 17 )
    })
}

// Función para cambiar de dólares a pesos mexicanos usando async-await
async function cambiarAPesosMexicanosAsincronaApi(montoEnUSD) {
    const precioDolar = await obtenerPrecioDolar()
    console.log(`1 USD = ${precioDolar} MXN`)
    return montoEnUSD * precioDolar
}

// Función para saludar a un ucamper y mostrar el monto en pesos mexicanos
function saludar(ucamper, montoEnUSD) {
    console.log(`Hola querid@ ${ucamper}`)
    //console.log( "Hola querido " + ucamper )
    // Hacer solo si el monto es enviado o no es cero
    if( montoEnUSD ) {
        console.log(ucamper, "Tu tienes: ", cambiarAPesosMexicanos(montoEnUSD), " mxn *sin async" )
    
        cambiarAPesosMexicanosAsincrona(montoEnUSD)
            .then( precioFinal => {
                console.log(ucamper, "Tu tienes: ", precioFinal, " mxn *Con Promesa y valor constante del dolar" )
            })
        
        cambiarAPesosMexicanosAsincronaApi(montoEnUSD)
            .then( precioFinal => {
                console.log(ucamper, "Tu tienes: ", precioFinal, " mxn *Con async-await y valor real del dolar desde API de Banxico" )
            })
    }
    
}

// Ejecución de la función saludar en varios momentos y con diferentes ucampers
saludar("Carlos", 1800)

setTimeout( saludar , 5000, "Julio" )

setTimeout( saludar , 5000, "Ari" )

setTimeout( function(ucamper) {
    console.log(`Hola querid@ ${ucamper}`)
    //console.log( "Hola querid@ " + ucamper )
} , 7000, "Alma" )

setTimeout( ucamper => {
    console.log(`Hola querid@ ${ucamper}`)
    //console.log( "Hola querid@ " + ucamper )
} , 2000, "Luis" )