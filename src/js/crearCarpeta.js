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

const botonCrearCarpeta = document.getElementById("botonCrearCarpeta")
const idDoc = document.getElementById("idDoc")
let urlParam = new URLSearchParams(window.location.search)
let urlUserID = urlParam.get('uid')

botonCrearCarpeta.addEventListener("click", async () => {
    if (nombreCarpeta.value != "" && juegoCarpeta.value != "") {
        nombreCarpeta.disabled = true
        juegoCarpeta.disabled = true
        botonCrearCarpeta.disabled = true
        
        try {
            const docRef = await addDoc(collection(db, "carpetas"), {
                nombre: nombreCarpeta.value,
                juego: juegoCarpeta.value,
                userid: urlUserID
            });

            idDoc.value = docRef.id
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        //QUITAR ESTILOS VALIDACION
        nombreCarpeta.classList.remove('is-invalid')
        nombreCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        juegoCarpeta.classList.remove('is-invalid')
        juegoCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'none'

        if (juegoCarpeta.value == "Pokemon") {
            var juegoURL = "https://i.ibb.co/V2WTvVT/pokelogo.png"
        } else {
            var juegoURL = "https://i.ibb.co/1fjcbJj/mtglogo.png"
        }
        //AGREGAR INFO A COLUMNA
        infoCarpeta.innerHTML = `
            <img src="${juegoURL}" width="50%" class="img-fluid mb-3">
            <h3>${nombreCarpeta.value}</h3>
            <a href="agregar-cartas.html?uid=${urlUserID}&id=${idDoc.value}"></a>
        `
        infoCarpeta.classList.add("opacity-1")
        infoCarpeta.classList.remove("opacity-0")

    } else {//VALIDAR CAMPOS
        if (nombreCarpeta.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            nombreCarpeta.classList.add('is-invalid')
            nombreCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            nombreCarpeta.classList.remove('is-invalid')
            nombreCarpeta.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
        if (juegoCarpeta.value == "") {
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