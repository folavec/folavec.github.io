//ELEMENTOS CARPETA
const nombreCarpeta = document.getElementById("nombreCarpeta")
const juegoCarpeta = document.getElementById("juegoCarpeta")
const botonCrearCarpeta = document.getElementById("botonCrearCarpeta")
const infoCarpeta = document.getElementById("infoCarpeta")
//ELEMENTOS CARTA
const nombreCarta = document.getElementById("nombreCarta")
const imagenCarta = document.getElementById("imagenCarta")
const precioCarta = document.getElementById("precioCarta")
const estadoCarta = document.getElementById("estadoCarta")
const infoAdicional = document.getElementById("infoAdicional")
const agregarCarta = document.getElementById("agregarCarta")
const resumenCarpeta = document.getElementById("resumenCarpeta")
const paso2 = document.getElementById("paso2")
const paso2extra = document.getElementById("paso2extra")
//NUMERO RANDOM
const randomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

class Carpeta {
    constructor(id, nombre, juego) {
        this.id = id
        this.nombre = nombre
        this.juego = juego
    }
}
class Carta{
    constructor(nombre, imagen, precioUSD, estado, info){
        this.nombre = nombre
        this.imagen = imagen
        this.precioUSD = precioUSD
        this.estado = estado
        this.info = info
    }
    get precioARG(){
        return this.precioUSD * 98
    }
    get precioCLP(){
        return this.precioCLP * 800
    }
}

var laCarpeta = []

botonCrearCarpeta.addEventListener('click', (e) => {
    if (nombreCarpeta.value != "" && juegoCarpeta.value != ""){
        //BLOQUEAR EL FORM Y CREAR LA CARPETA
        e.preventDefault()
        nombreCarpeta.disabled = true
        juegoCarpeta.disabled = true
        botonCrearCarpeta.disabled = true
        var idCarpeta = randomInt(1000, 9999)
        carpetaCreada = new Carpeta(idCarpeta, nombreCarpeta.value, juegoCarpeta.value)

        laCarpeta.push(carpetaCreada)

        //QUITAR ESTILOS VALIDACION
        nombreCarpeta.classList.remove('is-invalid')
        nombreCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        juegoCarpeta.classList.remove('is-invalid')
        juegoCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'none'

        if (juegoCarpeta.value == "Pokemon"){
            var juegoURL = "https://upload.wikimedia.org/wikipedia/commons/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg"
        }else{
            var juegoURL = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Magicthegathering-logo.svg"
        }
        //AGREGAR INFO A COLUMNA
        infoCarpeta.innerHTML = `
            <img src="${juegoURL}" width="70%" class="img-fluid mb-3">
            <h3>${nombreCarpeta.value}</h3>
            <h3>ID: ${idCarpeta}</h3>
        `
        infoCarpeta.classList.add("opacity-1")
        infoCarpeta.classList.remove("opacity-0")

        paso2.classList.add("opacity-1")
        paso2.classList.remove("opacity-0")

        console.log(laCarpeta)
    }else{//VALIDAR CAMPOS
        e.preventDefault()
        if (nombreCarpeta.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            nombreCarpeta.classList.add('is-invalid')
            nombreCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        }else{
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            nombreCarpeta.classList.remove('is-invalid')
            nombreCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        } 
        if (juegoCarpeta.value == ""){
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            juegoCarpeta.classList.add('is-invalid')
            juegoCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            juegoCarpeta.classList.remove('is-invalid')
            juegoCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
    }
})

agregarCarta.addEventListener('click', (e) => {
    if (nombreCarta.value != "" && imagenCarta.value != "" && precioCarta.value != "" && estadoCarta.value != "" && infoAdicional.value != ""){
        e.preventDefault()

        crearCarta = new Carta(nombreCarta.value, imagenCarta.value, precioCarta.value, estadoCarta.value, infoAdicional.value)

        laCarpeta.push(crearCarta)

        paso2extra.classList.add("opacity-1")
        paso2extra.classList.remove("opacity-0")

        console.log(laCarpeta)

        const listaCarta = document.createElement("div")
        listaCarta.classList.add("mt-3")
        listaCarta.classList.add("p-3")
        listaCarta.classList.add("row")
        listaCarta.classList.add("info-ultima-carta")
        //AGREGAR INFO A COLUMNA
        listaCarta.innerHTML = `
            <div class="col-12 col-lg-4">
                <img src="${imagenCarta.value}" class="img-fluid w-100">
            </div>
            <div class="col-12 col-lg-8">
                <p><strong>${nombreCarta.value}</strong></p>
                <p>
                    US$ ${precioCarta.value}<br>
                    ${estadoCarta.value}<br>
                    ${infoAdicional.value}
                </p>
            </div>
        `
        resumenCarpeta.prepend(listaCarta)
        
        if (resumenCarpeta.childElementCount > 2){
            console.log(resumenCarpeta.childElementCount)
            resumenCarpeta.removeChild(resumenCarpeta.lastElementChild)
        }
        //QUITAR ESTILOS VALIDACION
        nombreCarta.classList.remove('is-invalid')
        nombreCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        imagenCarta.classList.remove('is-invalid')
        imagenCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        precioCarta.classList.remove('is-invalid')
        precioCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        estadoCarta.classList.remove('is-invalid')
        estadoCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        infoAdicional.classList.remove('is-invalid')
        infoAdicional.parentNode.querySelector('.invalid-feedback').style.display = 'none'

        //REINICIAR FORM
        nombreCarta.value = ""
        imagenCarta.value = ""
        precioCarta.value = ""
        estadoCarta.value = ""
        infoAdicional.value = ""
    }else{//VALIDAR CAMPOS
        e.preventDefault()
        if (nombreCarta.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            nombreCarta.classList.add('is-invalid')
            nombreCarta.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            nombreCarta.classList.remove('is-invalid')
            nombreCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
        if (imagenCarta.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            imagenCarta.classList.add('is-invalid')
            imagenCarta.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            imagenCarta.classList.remove('is-invalid')
            imagenCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
        if (precioCarta.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            precioCarta.classList.add('is-invalid')
            precioCarta.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            precioCarta.classList.remove('is-invalid')
            precioCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
        if (estadoCarta.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            estadoCarta.classList.add('is-invalid')
            estadoCarta.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            estadoCarta.classList.remove('is-invalid')
            estadoCarta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
        if (infoAdicional.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            infoAdicional.classList.add('is-invalid')
            infoAdicional.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            infoAdicional.classList.remove('is-invalid')
            infoAdicional.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
    }
})