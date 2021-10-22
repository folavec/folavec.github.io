import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"

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

const carpetasDisponibles = document.getElementById("carpetasDisponibles")

const querySnapshot = await getDocs(collection(db, "carpetas"));
querySnapshot.forEach((doc) => {
    let nombre = doc.data().nombre
    let juego = doc.data().juego
    let id = doc.id
    let imagenJuego = ""

    if(juego == "Pokémon"){
        imagenJuego = "https://i.ibb.co/V2WTvVT/pokelogo.png"
    }else if(juego == "Magic The Gathering"){
        imagenJuego = "https://i.ibb.co/1fjcbJj/mtglogo.png"
    }
    const carpetaSingle = document.createElement("div")
    $(carpetaSingle).addClass("col-12 col-md-4 col-lg-3")

    carpetaSingle.innerHTML = `
        <div class="card">
            <img src="${imagenJuego}" class="card-img-top p-3" alt="${nombre}">
            <div class="card-body text-center">
                <h3>${nombre}</h3>

                <a href="carpeta.html?id=${id}" class="btn btn-primary mt-3">Ver más</a>
            </div>
    `
    
    carpetasDisponibles.prepend(carpetaSingle)

    //console.log(`${doc.id} => ${doc.data()}`);
});

