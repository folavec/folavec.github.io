import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"
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
const auth = getAuth()

const emailUsuario = document.getElementById("emailUsuario")
const idUsuario = document.getElementById("idUsuario")
const misCarpetas = document.getElementById("misCarpetas")
const irCrearCarpeta = document.getElementById("irCrearCarpeta")

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid
        const userEmail = user.email
        emailUsuario.innerHTML = userEmail
        idUsuario.value = uid

        const q = query(collection(db, "carpetas"), where("userid", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let nombre = doc.data().nombre
            let juego = doc.data().juego
            let id = doc.id
            let imagenJuego = ""

            if (juego == "Pokémon") {
                imagenJuego = "https://i.ibb.co/V2WTvVT/pokelogo.png"
            } else if (juego == "Magic The Gathering") {
                imagenJuego = "https://i.ibb.co/1fjcbJj/mtglogo.png"
            }
            const carpetaSingle = document.createElement("div")
            $(carpetaSingle).addClass("col-12 col-md-4 col-lg-3")

            carpetaSingle.innerHTML = `
        <div class="card">
            <img src="${imagenJuego}" class="card-img-top p-3" alt="${nombre}">
            <div class="card-body text-center">
                <h3>${nombre}</h3>

                <a href="carpeta.html?id=${id}" class="btn btn-primary mt-3">Ver carpeta</a>

                <a href="agregar-cartas.html?id=${id}&uid=${uid}" class="btn btn-info mt-3">Agregar cartas</a>
            </div>
    `

            misCarpetas.prepend(carpetaSingle)

            //console.log(`${doc.id} => ${doc.data()}`);
        })

        const irACrearCarpeta = () => {
            irCrearCarpeta.href = "crear-carpeta.html?uid=" + uid
        }

        irACrearCarpeta()
    } else {
        window.location = "entrar.html"
    }
})

const cerrarSesion = document.getElementById("cerrarSesion")

cerrarSesion.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location = "entrar.html"
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode, errorMessage)
    });
})