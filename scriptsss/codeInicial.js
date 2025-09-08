//#region CONSTS
const proprietario = window.localStorage.getItem('usuarioStorage');
const idProprietario = proprietario[0];
const botaoStatus = document.querySelectorAll('.buttonStatus');
const botaoStatusVermelho = document.querySelector('#ButtonStatusVermelho');
const botaoStatusVerde = document.querySelector('#ButtonStatusVerde');
const botaoStatusAmarelo = document.querySelector('#ButtonStatusAmarelo');
const botaoCriarProjeto = document.querySelector('#id_botao_criarProjeto');
const mainBlocos = document.querySelector('#id_mainBlocos');
const botaoSair = document.querySelector('#id_botao_sair');
//#endregion

//#region EVENTS
botaoStatusVermelho.addEventListener('click', ()=>{
    mudarContexto(botaoStatusVermelho);
})

botaoStatusAmarelo.addEventListener('click', ()=>{
    mudarContexto(botaoStatusAmarelo);
})

botaoStatusVerde.addEventListener('click', ()=>{
    mudarContexto(botaoStatusVerde);
})


function mudarContexto(contexto){
    botaoStatus.forEach(function (contexto){
        contexto.classList.remove('active')
    }
    )
    contexto.classList.add('active')
}

botaoCriarProjeto.addEventListener('click', () => { criarProjeto() })

botaoSair.addEventListener('click', () => { window.localStorage.setItem('usuarioStorage', null) });
//#endregion

mostraProjetos();

async function criarProjeto() {
    if (!isNaN(idProprietario-1)) {
        await fetch('http://localhost:3000/projetos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                tituloProjeto: "Novo Projeto",
                status: "Não iniciado",
                codProprietario: idProprietario,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        });
    }
    
    mostraProjetos();
}

async function mostraProjetos() {
    const projetos = await fetch(`http://localhost:3000/projetos/${idProprietario}`);
    const projetosConvertido = await projetos.json();

    mainBlocos.innerHTML = '';
    let i = 0;

    projetosConvertido.forEach(projeto => {
        mainBlocos.innerHTML += `
            <div class="meio_bloco">
                <section class="bloco_config">
                    <p>${projeto.tituloProjeto}</p> <i class="fa-solid fa-ellipsis"></i>
                </section>

                <section class="bloco_config branco">
                </section>

                <section class="bloco_config blocoBarra">
                    <div class="barra" id="barraDentro">
                        <div class="barraProgessoAumento" id="barraProgesso" style="width: 12%;"></div>
                    </div>

                    <div id="mudaCor${i}"></div>
                </section>
            </div>
        `;

        let cor = '';

        switch (projeto.status) {
            case 'Não iniciado':
                cor = 'mudaCorVermelho';
                break;

            case 'Em andamento':
                cor = 'mudaCorAmarelo';
                break;

            case 'Finalizado':
                cor = 'mudaCorVerde';
                break;
        }

        const mudaCor = document.querySelector(`#mudaCor${i}`);
        mudaCor.classList.add(cor);

        i++
    });
    
}