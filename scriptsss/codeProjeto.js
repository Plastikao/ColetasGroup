//#region VARIAVEIS
const projetoAberto = window.localStorage.getItem('projetoAberto');
const nomeHeaderProjeto = document.querySelector('.header__h1');
const mainPrincipal = document.querySelector('.main__principal');
const botaoCriarBloco = document.querySelector('.main__botao');

const projeto = await fetch(`http://localhost:3000/projetos/busca/${projetoAberto}`);
const projetoConvertido = await projeto.json();

const blocos = await fetch(`http://localhost:3000/blocos/busca/${projetoAberto}`);
const blocosConvertido = await blocos.json();
//#endregion

//#region EVENTS
botaoCriarBloco.addEventListener('click', () => { criarBloco() });
//#endregion

async function criarBloco() {
    let i = 0;

    for(i = 0; i < blocosConvertido; i++) {};

    await fetch('http://localhost:3000/blocos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeBloco: 'Novo bloco',
            posicao: i,
            codProjeto: projetoAberto,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    });

    mostraProjeto();
}

mostraProjeto();

async function mostraProjeto() {
    nomeHeaderProjeto.innerHTML = projetoConvertido.tituloProjeto;

    mainPrincipal.innerHTML = '';
    
    let i = 0;

    blocosConvertido.forEach(bloco => {
        mainPrincipal.innerHTML += `
            <div class="div__main-projetos bloco${i}">
                <input type="text" class="input__texto" placeholder="Nome do bloco" value="${bloco.nomeBloco}"/>
                <button class="botao__main_projetos">Criar nova classe</button>
            </div>
        `

        i++;
    });
}