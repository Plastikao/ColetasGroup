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

//#region CRIAR_ELEMENTOS
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

async function criarClasse(idBloco) {
    Swal.fire({
        title: "Nova classe",

        html:`
            <input type="text" id="id_NomeClasse" placeholder="Nome da classe" value="Nova classe">
            <select id="id_TipoClasse">
                <option value="texto">Texto</option>
                <option value="checkbox">Checkbox</option>
                <option value="link">Link</option>
                <option value="imagem">Imagem</option>
            </select>
        `,

        showDenyButton: true,
        confirmButtonText: "Criar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            const nomeClasse = document.querySelector('#id_NomeClasse').value;
            const tipoClasse = document.querySelector('#id_TipoClasse').value;

            insertClasse(nomeClasse, tipoClasse);
        }
    });

    async function insertClasse(nome, tipo) {
        console.log(`\n\n\n${idBloco}\n\n\n`);

        const classes = await fetch(`http://localhost:3000/classes/busca/${idBloco}`);
        const classesConvertido = await classes.json();

        let i = 0;
        
        for(i = 0; i < classesConvertido.length; i++) {};

        
        await fetch('http://localhost:3000/classes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nomeClasse: nome,
                ordemClasse: i,
                tipoClasse: tipo,
                codBloco: idBloco,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        });

        mostraProjeto();
    }
}
//#endregion

async function procuraClasse(mostraClasse, blocoClasse) {
    const classes = await fetch(`http://localhost:3000/classes/busca/${blocoClasse.id}`);
    const classeConvertido = await classes.json();

    classeConvertido.forEach(classe => {
        if (classe.tipoClasse == 'texto') {
            mostraClasse += `
                <div>
                    <div class="main__projetos-dentro">
                        <input
                            type="text"
                            class="input__texto-dentro"
                            value="${classe.nomeClasse}"
                        />
                        <button class="botao__main_projetos-dentro">+</button>
                    </div>
                </div>
            `
        }

        else if (classe.tipoClasse == 'checkbox') {
            mostraClasse += `
                <div>
                    <div class="main__projetos-dentro">
                        <input
                            type="text"
                            class="input__texto-dentro"
                            value="${classe.nomeClasse}"
                        />
                        <button class="botao__main_projetos-dentro">+</button>
                    </div>
                </div>
            `
        }

        else if (classe.tipoClasse == 'link') {
            mostraClasse += `
                <div>
                    <div class="main__projetos-dentro">
                        <input
                            type="text"
                            class="input__texto-dentro"
                            value="${classe.nomeClasse}"
                        />
                        <button class="botao__main_projetos-dentro">+</button>
                    </div>
                </div>
            `
        }

        else if (classe.tipoClasse == 'imagem') {
            mostraClasse += `
                <div>
                    <div class="main__projetos-dentro">
                        <input
                            type="text"
                            class="input__texto-dentro"
                            value="${classe.nomeClasse}"
                        />
                        <button class="botao__main_projetos-dentro">+</button>
                    </div>
                </div>
            `
        }
    });

    return mostraClasse;
}

mostraProjeto();

function mostraProjeto() {
    nomeHeaderProjeto.innerHTML = projetoConvertido.tituloProjeto;

    mainPrincipal.innerHTML = '';
    
    let i = 0;

    blocosConvertido.forEach(async bloco => {
        for(bloco of blocosConvertido) {
            var mostraClasse = '';

            mostraClasse = await procuraClasse(mostraClasse, bloco);

            mainPrincipal.innerHTML += `
                <div class="div__main-projetos bloco${i}">
                    <input type="text" class="input__texto" placeholder="Nome do bloco" value="${bloco.nomeBloco}"/>
                    <button class="botao__main_projetos ${bloco.id}">Criar nova classe</button>
                    ${mostraClasse}
                </div>
            `;
        }

        const botaoCriarClasse = document.querySelectorAll('.botao__main_projetos');

        botaoCriarClasse.forEach(botao => {
            const idBloco = botao.classList[1];
            botao.addEventListener('click', () => { criarClasse(idBloco) });
        });
        

        i++;
    });
}