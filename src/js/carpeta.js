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

/*VARIABLES PARA API DOLAR*/
const apiDolar = "https://api.exchangerate-api.com/v4/latest/USD"
let dolarCLP
let dolarARS

fetch(apiDolar)
    .then((response) => response.json()) // paso 1
    .then((data) => {          // paso 2
        dolarCLP = data.rates.CLP
        dolarARS = data.rates.ARS
    })
    .then(function () {
        obtenerCartas.forEach((doc) => {
            let nombre = doc.data().nombre
            let precio = doc.data().precio
            let imagen = doc.data().imagen
            let estado = doc.data().estado
            let informacion = doc.data().informacion

            var opts = { minimumFractionDigits: 1 }
            let precioCLP = precio * dolarCLP
            let precioARS = precio * dolarARS
            
            let precioFormateado = precio.toLocaleString("es-CL", opts)
            let precioCLPformateado = precioCLP.toLocaleString("es-CL", opts)
            let precioARSformateado = precioARS.toLocaleString("es-AR", opts)

            const cartaSingle = document.createElement("div")
            $(cartaSingle).addClass("col-12 col-md-4 col-lg-3")

            cartaSingle.innerHTML = `
                <div class="card">
                    <img src="${imagen}" class="card-img-top p-3" alt="${nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text"><strong>Estado: </strong>${estado}<br><strong>Información adicional: </strong>${informacion}</p>
                        <p class="precioUSD"><strong>Precio US$ <span class="precioCarta">${precioFormateado}</span></strong></p>
                        <p class="precioCLP d-none"><strong>Precio CLP$ <span class="precioCarta">${precioCLPformateado}</span></strong></p>
                        <p class="precioARS d-none"><strong>Precio ARS$ <span class="precioCarta">${precioARSformateado}</span></strong></p>
                        <a href="#" class="btn btn-primary">Me interesa!</a>
                    </div>
                </div>
            `

            cartasCarpeta.prepend(cartaSingle)

            //console.log(`${doc.id} => ${doc.data()}`);
        });
    })
    .catch((err) => {
        console.log('No results', err)
    })

const verMoneda = document.getElementById("verMoneda")

verMoneda.addEventListener("change", () => {
    if(verMoneda.value == "USD"){
        $(".precioCLP").addClass("d-none")
        $(".precioARS").addClass("d-none")
        $(".precioUSD").removeClass("d-none")
    } else if (verMoneda.value == "CLP"){
        $(".precioCLP").removeClass("d-none")
        $(".precioARS").addClass("d-none")
        $(".precioUSD").addClass("d-none")
    } else if (verMoneda.value == "ARS") {
        $(".precioCLP").addClass("d-none")
        $(".precioARS").removeClass("d-none")
        $(".precioUSD").addClass("d-none")
    }
})