let botaoStatus = document.querySelectorAll('.buttonStatus')
let botaoStatusVermelho = document.querySelector('#ButtonStatusVermelho')
let botaoStatusVerde = document.querySelector('#ButtonStatusVerde')
let botaoStatusAmarelo = document.querySelector('#ButtonStatusAmarelo')

botaoStatusVermelho.addEventListener('click', ()=>{
    mudarContexto(botaoStatusVermelho)
})

botaoStatusAmarelo.addEventListener('click', ()=>{
    mudarContexto(botaoStatusAmarelo)
})

botaoStatusVerde.addEventListener('click', ()=>{
    mudarContexto(botaoStatusVerde)
})


function mudarContexto(contexto){
    botaoStatus.forEach(function (contexto){
        contexto.classList.remove('active')
    }
    )
    contexto.classList.add('active')
}