import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDMqCJXbCDqz6GgOTIfO3yTr9PXLiJoksg",
    authDomain: "coleccionable-5ed79.firebaseapp.com",
    projectId: "coleccionable-5ed79",
    storageBucket: "coleccionable-5ed79.appspot.com",
    messagingSenderId: "149843405117",
    appId: "1:149843405117:web:5c591278b44335ab82bd54"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth()

const loginButton = document.getElementById("login")
const emailLogin = document.getElementById("emailLogin")
const passwordLogin = document.getElementById("passwordLogin")

const signinButton = document.getElementById("signin")
const emailSignin = document.getElementById("emailSignin")
const passwordSignin = document.getElementById("passwordSignin")

let passwordFuerte = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

//REVISAR SI ESTA LOGGEADO Y REDIRECCIONAR
onAuthStateChanged(auth, (user) => {
    if (user) {
        $(location).attr('href', "mi-cuenta.html");
    } else {
        
    }
})

//CREAR CUENTA
signinButton.addEventListener("click", () => {
    if (emailSignin.value != "" && passwordSignin.value != ""){

        if(passwordFuerte.test(passwordSignin.value)){
            passwordSignin.classList.remove('is-invalid')
            passwordSignin.parentNode.querySelector('.password-debil').style.display = 'none'

            createUserWithEmailAndPassword(auth, emailSignin.value, passwordSignin.value)
                .then((userCredential) => {
                    console.log("Usuario creado")
                    $(location).attr('href', "mi-cuenta.html");
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMsg = error.message
                    
                    console.log(errorCode, errorMsg)
                })
        }else{
            passwordSignin.classList.add('is-invalid')
            passwordSignin.parentNode.querySelector('.password-debil').style.display = 'block'
        }
        

        emailSignin.classList.remove('is-invalid')
        emailSignin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        passwordSignin.classList.remove('is-invalid')
        passwordSignin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
    }else{
        if (emailSignin.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            emailSignin.classList.add('is-invalid')
            emailSignin.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            emailSignin.classList.remove('is-invalid')
            emailSignin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
        if (passwordSignin.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            passwordSignin.classList.add('is-invalid')
            passwordSignin.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            passwordSignin.classList.remove('is-invalid')
            passwordSignin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
    }
})

//INICIAR SESION
loginButton.addEventListener("click", () => {
    if (emailLogin.value != "" && passwordLogin.value != "") {
        
        signInWithEmailAndPassword(auth, emailLogin.value, passwordLogin.value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Sesion iniciada: ", user)

                $(location).attr('href', "mi-cuenta.html");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/invalid-email"){
                    emailLogin.classList.add('is-invalid')
                    emailLogin.parentNode.querySelector('.email-noexiste').style.display = 'block'
                } else if (errorCode == "auth/wrong-password"){
                    passwordLogin.classList.add('is-invalid')
                    passwordLogin.parentNode.querySelector('.password-incorrecto').style.display = 'block'
                }
                
                console.log(errorCode, errorMessage)
            });

        emailLogin.classList.remove('is-invalid')
        emailLogin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        passwordLogin.classList.remove('is-invalid')
        passwordLogin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
    }else{
        if (emailLogin.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            emailLogin.classList.add('is-invalid')
            emailLogin.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            emailLogin.classList.remove('is-invalid')
            emailLogin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
        if (passwordLogin.value == "") {
            //AÑADIR ESTILOS Y MENSAJE DE ERROR
            passwordLogin.classList.add('is-invalid')
            passwordLogin.parentNode.querySelector('.invalid-feedback').style.display = 'block'
        } else {
            //QUITAR ESTILOS Y MENSAJE DE ERROR
            passwordLogin.classList.remove('is-invalid')
            passwordLogin.parentNode.querySelector('.invalid-feedback').style.display = 'none'
        }
    }
})