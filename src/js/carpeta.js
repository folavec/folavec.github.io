import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { getFirestore, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"

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

//PARAMETROS PARA OBTENER EL NOMBRE DE LA CARPETA
const tituloCarpeta = document.getElementById("tituloCarpeta")
const imagenJuegoCarpeta = document.getElementById("imagenJuegoCarpeta")
let urlParam = new URLSearchParams(window.location.search)
let urlID = urlParam.get('id')

const q = query(collection(db, "carpetas"), where("__name__", "==", urlID));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    let nombre = doc.data().nombre
    let juego = doc.data().juego
    let imagenJuego = ""

    if (juego == "Pokémon") {
        imagenJuego = "https://i.ibb.co/V2WTvVT/pokelogo.png"
    } else if (juego == "Magic The Gathering") {
        imagenJuego = "https://i.ibb.co/1fjcbJj/mtglogo.png"
    }

    tituloCarpeta.innerHTML = nombre
    imagenJuegoCarpeta.src = imagenJuego
});

//OBTENER LAS CARTAS Y MOSTRARLAS
const cartasCarpeta = document.getElementById("cartasCarpeta")

const obtenerCartas = await getDocs(collection(db, "carpetas", urlID, "cartas"));
obtenerCartas.forEach((doc) => {
    let nombre = doc.data().nombre
    let precio = doc.data().precio
    let imagen = doc.data().imagen
    let estado = doc.data().estado
    let informacion = doc.data().informacion
    
    const cartaSingle = document.createElement("div")
    $(cartaSingle).addClass("col-12 col-md-4 col-lg-3")

    cartaSingle.innerHTML = `
                <div class="card">
                    <img src="${imagen}" class="card-img-top p-3" alt="${nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text"><strong>Estado: </strong>${estado}<br><strong>Información adicional: </strong>${informacion}</p>
                        <p><strong>Precio US$ <span id="precioCarta">${precio}</span></strong></p>
                        
                    </div>
                </div>
            `

    cartasCarpeta.prepend(cartaSingle)

    //console.log(`${doc.id} => ${doc.data()}`);
});