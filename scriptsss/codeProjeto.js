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

async function criarConteudo(idClasse, tipoClasse) {
    const conteudo = await fetch(`http://localhost:3000/conteudos/busca/${idClasse}`);
    const conteudoConvertido = await conteudo.json();

    let i = 0;
        
    for(i = 0; i < conteudoConvertido.length; i++) {};

    await fetch('http://localhost:3000/conteudos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeConteudo: 'Nova tarefa',
            ordemConteudo: i,
            conteudo: '',
            codClasse: idClasse,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    });

    mostraProjeto();
}
//#endregion

async function procuraClasse(blocoDaClasse) {
    const classes = await fetch(`http://localhost:3000/classes/busca/${blocoDaClasse.id}`);
    const classeConvertido = await classes.json();

    let mostraClasse = '';

    for(const classe of classeConvertido) {
        let mostraConteudo = await procuraConteudo(classe);

        mostraClasse += `
            <div>
                <div class="main__projetos-dentro">
                    <input
                        type="text"
                        class="input__texto-dentro"
                        value="${classe.nomeClasse}"
                    />
                    <button class="botao__main_projetos-dentro ${classe.id} ${classe.tipoClasse}">+</button>
                </div>
                ${mostraConteudo}
            </div>
        `
        //<div class="mains__projetos-dentro-2">
        //    ${mostraConteudo}
        //</div>
    };

    return mostraClasse;
}

async function procuraConteudo(classeDoConteudo) {
    const conteudo = await fetch(`http://localhost:3000/conteudos/busca/${classeDoConteudo.id}`);
    const conteudoConvertido = await conteudo.json();

    let mostraConteudo = '';

    if (conteudoConvertido.length > 0) {
        mostraConteudo += '<div class="mains__projetos-dentro-2">'
    }

    for(const conteudo of conteudoConvertido) {
        if (classeDoConteudo.tipoClasse == 'checkbox') {
            mostraConteudo += `
                <div class="projeto__checkbox">
                    <input type="checkbox" class="conteudo_checkbox"/>
                    <label for="projeto__checkbox">${conteudo.nomeConteudo}</label>
                </div>
            `
        }
        
        else if (classeDoConteudo.tipoClasse == 'link') {
            mostraConteudo += `
                <div class="projeto__checkbox">
                    <label for="projeto__checkbox">
                    <a href="${conteudo.conteudo}">${conteudo.nomeConteudo}</a></label>
                </div>
            `
        }

        else if (classeDoConteudo.tipoClasse == 'imagem') {
            mostraConteudo += `
                <div class="projeto__checkbox">
                    <label for="projeto__checkbox">
                    <img src="${conteudo.conteudo}" alt="imagens"/>${conteudo.nomeConteudo}</label>
                </div>
            `
        }

        else if (classeDoConteudo.tipoClasse == 'texto') {
            mostraConteudo += `
                <div class="projeto__checkbox">
                    <label for="projeto__checkbox">
                    <span>${conteudo.nomeConteudo}</span></label>
                </div>
            `
        }
    };

    if (conteudoConvertido.length > 0) {
        mostraConteudo += '</div>'
    }

    return mostraConteudo;
}

mostraProjeto();

async function mostraProjeto() {
    nomeHeaderProjeto.innerHTML = projetoConvertido.tituloProjeto;

    mainPrincipal.innerHTML = '';
    
    let i = 0;

    for(const bloco of blocosConvertido) {
        var mostraClasse = await procuraClasse(bloco);

        mainPrincipal.innerHTML += `
            <div class="div__main-projetos bloco${i}">
                <input type="text" class="input__texto" placeholder="Nome do bloco" value="${bloco.nomeBloco}"/>
                <button class="botao__main_projetos ${bloco.id}">Criar nova classe</button>
                ${mostraClasse}
            </div>
        `;
        
        i++;
    };

    const botaoCriarClasse = document.querySelectorAll('.botao__main_projetos');
    const botaoCriarConteudo = document.querySelectorAll('.botao__main_projetos-dentro');

    botaoCriarClasse.forEach(botao => {
        const idBloco = botao.classList[1];

        botao.addEventListener('click', () => { criarClasse(idBloco) });
    });

    botaoCriarConteudo.forEach(botao => {
        const idClasse = botao.classList[1];
        const tipoClasse = botao.classList[2];

        botao.addEventListener('click', () => { criarConteudo(idClasse, tipoClasse) })
    })
}