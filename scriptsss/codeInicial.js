//#region VARIAVEIS
const proprietario = window.localStorage.getItem('usuarioStorage');
const idProprietario = proprietario[0];
const botaoStatus = document.querySelectorAll('.buttonStatus');
const botaoStatusVermelho = document.querySelector('#ButtonStatusVermelho');
const botaoStatusVerde = document.querySelector('#ButtonStatusVerde');
const botaoStatusAmarelo = document.querySelector('#ButtonStatusAmarelo');
const botaoCriarProjeto = document.querySelector('#id_botao_criarProjeto');
const mainBlocos = document.querySelector('#id_mainBlocos');
const botaoSair = document.querySelector('#id_botao_sair');
const menuLateral = document.querySelector('#menuLateral');
const menuLateralBotao = document.querySelector('#menuLateral-abrir');
const barraPesquisa = document.querySelector('.pesquisaInput');
var pesquisaProjeto = '';
var statusProjeto = '';
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

menuLateralBotao.addEventListener('click', () => { ativarMenuLateral() });

barraPesquisa.addEventListener('keyup', () => {
    pesquisaProjeto = barraPesquisa.value;

    mostraProjetos();
})

function mudarContexto(contexto){
    if (!contexto.classList.contains('active')) {
        botaoStatus.forEach(function (contexto){ contexto.classList.remove('active') });

        contexto.classList.add('active')
        statusProjeto = contexto.innerHTML;
    }
    
    else {
        botaoStatus.forEach(function (contexto){ contexto.classList.remove('active') });
        statusProjeto = '';
    }

    mostraProjetos();
}

function ativarMenuLateral() {
    if (menuLateral.style.display == "none") {
        menuLateral.style.display = "block";
    }

    else {
        menuLateral.style.display = "none";
    }
}

async function alteraStatus(botao, idProjeto) {
    let statusAtual = '';
    let status = botao.value;

    switch (status) {
        case 'nao_iniciado':
            statusAtual = 'Não iniciado'
            break;

        case 'em_andamento':
            statusAtual = 'Em andamento'
            break;

        case 'finalizado':
            statusAtual = 'Finalizado'
            break;

        default:
            statusAtual = 'Não iniciado'
            break;
    }

    await fetch(`http://localhost:3000/projetos/${idProjeto}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            status: statusAtual
        })
    });

    mostraProjetos();
}

botaoCriarProjeto.addEventListener('click', () => { criarProjeto() })

botaoSair.addEventListener('click', () => {
    window.localStorage.setItem('usuarioStorage', null);
    window.location.href = '../index.html';
});
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
}

async function mostraProjetos() {
    const projetos = await fetch(`http://localhost:3000/projetos/${idProprietario}`);
    const projetosConvertido = await projetos.json();

    mainBlocos.innerHTML = '';
    let i = 0;

    projetosConvertido.forEach(projeto => {
        if ((projeto.status == statusProjeto || statusProjeto == '') && ((projeto.tituloProjeto).toLowerCase().includes(pesquisaProjeto))) {
            mainBlocos.innerHTML += `
                <div class="meio_bloco">
                    <section class="bloco_config">
                        <p>${projeto.tituloProjeto}</p><i class="fa-solid fa-ellipsis"></i>
                    </section>

                    <section class="bloco_config branco" id="${projeto.id}">
                    </section>

                    <section class="bloco_config blocoBarra">
                        <div class="barra" id="barraDentro">
                            <div class="barraProgessoAumento" id="barraProgesso" style="width: 12%;"></div>
                        </div>
                        
                        <select name="selectStatus" class="cl_mudaStatus" id="mudaCor${i}">
                            <option class="mudaCorVermelho" value="nao_iniciado"></option>
                            <option class="mudaCorAmarelo" value="em_andamento"></option>
                            <option class="mudaCorVerde" value="finalizado"></option>
                        </select>
                    </section>
                </div>
            `;

            let statusAtual = '';

            switch (projeto.status) {
                case 'Não iniciado':
                    statusAtual = 'mudaCorVermelho';
                    break;

                case 'Em andamento':
                    statusAtual = 'mudaCorAmarelo';
                    break;

                case 'Finalizado':
                    statusAtual = 'mudaCorVerde';
                    break;
            }

            const mudaStatus = document.querySelectorAll(`.${statusAtual}`);
            const selectStatus = document.querySelector(`#mudaCor${i}`);

            selectStatus.classList.add(statusAtual);
            selectStatus.classList.add(projeto.id)

            mudaStatus.forEach(status => {
                status.setAttribute('selected', true);
            });
        }

        i++
    });
    
    const blocosProjetos = document.querySelectorAll('.branco');
    const botaoMudaStatus = document.querySelectorAll('.cl_mudaStatus');

    botaoMudaStatus.forEach(botao => {
        botao.addEventListener('change', () => { alteraStatus(botao, botao.classList[2]) });
    });

    blocosProjetos.forEach(bloco => {
        bloco.addEventListener('click', () => {
            window.localStorage.setItem('projetoAberto', bloco.id);

            window.location.href = './paginaProjetos.html';
        });
    });
}