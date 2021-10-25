import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDMqCJXbCDqz6GgOTIfO3yTr9PXLiJoksg",
    authDomain: "coleccionable-5ed79.firebaseapp.com",
    projectId: "coleccionable-5ed79",
    storageBucket: "coleccionable-5ed79.appspot.com",
    messagingSenderId: "149843405117",
    appId: "1:149843405117:web:5c591278b44335ab82bd54"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore()

const agregarCarta = document.getElementById("agregarCarta")
const nombreCarpeta = document.getElementById("nombreCarpeta")
let urlParam = new URLSearchParams(window.location.search)
let urlUserID = urlParam.get('uid')
let urlID = urlParam.get('id')

$(agregarCarta).on('click', async () => {
    if (nombreCarta.value != "" && imagenCarta.value != "" && precioCarta.value != "" && estadoCarta.value != "" && infoAdicional.value != "") {

        try {
            const docRef = await addDoc(collection(db, "carpetas", urlID, "cartas"), {
                nombre: nombreCarta.value,
                imagen: imagenCarta.value,
                estado: estadoCarta.value,
                precio: precioCarta.value,
                informacion: infoAdicional.value
            });

            //idDoc.value = docRef.id
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        const listaCarta = document.createElement("div")
        $(listaCarta).addClass("mt-3 p-3 row info-ultima-carta");
        
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

        if (resumenCarpeta.childElementCount > 2) {
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
    } else {//VALIDAR CAMPOS
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