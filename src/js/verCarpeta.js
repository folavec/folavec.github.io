const tituloCarpeta = document.getElementById("tituloCarpeta")
const cartasCarpeta = document.getElementById("cartasCarpeta")
const apiCarpeta = "./json/carpeta.json"
const apiDolar = "https://api.exchangerate-api.com/v4/latest/USD"
let dolar = []
/*let dolarCLP = ""
let dolarARS = ""*/

/*$.get(apiDolar, (response, estado) => {
    if(estado === "success"){
        
        dolar.push({"CLP": response.rates.CLP})
        dolar.push({"ARS": response.rates.ARS})
    }else{
        console.log(estado)
    }
    
})*/
$.get(apiDolar, function (res, estado) {
    if (estado === "success") {
        dolar.push(res.rates)
    }
})

console.log(dolar)

$.get(apiCarpeta, (res, estado) => {
    if(estado === "success"){
        //console.log(res)
        let i = 0

        res.forEach((carta) => {
            if (i == 0) {
                tituloCarpeta.innerHTML = carta.nombre
            } else {
                const cartaSingle = document.createElement("div")
                $(cartaSingle).addClass("col-12 col-md-4 col-lg-3")

                cartaSingle.innerHTML = `
                <div class="card">
                    <img src="${carta.imagen}" class="card-img-top p-3" alt="${carta.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${carta.nombre}</h5>
                        <p class="card-text">${carta.estado}<br>${carta.info}</p>
                        <p><strong>Precio US$ <span id="precioCarta">${carta.precioUSD}</span></strong></p>
                        <p><strong>Precio CLP <span id="precioCarta">${carta.precioUSD * dolar.CLP}</span></strong></p>
                        <p><strong>Precio ARS <span id="precioCarta">${(carta.precioUSD * dolar.ARS).toFixed(2)}</span></strong></p>
                        <a href="#" id="aCLP" class="btn btn-primary">Precio en CLP</a>
                        <a href="#" id="aARG" class="btn btn-primary">Precio en ARG</a>
                    </div>
                </div>
            `

                cartasCarpeta.prepend(cartaSingle)
            }
            i++
        })
    }else{
        console.log(estado)
    }
})

