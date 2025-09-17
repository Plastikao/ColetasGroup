//#region VARIAVEIS
const projetoAberto = window.localStorage.getItem('projetoAberto');

const nomeHeaderProjeto = document.querySelector('#id_header__h1');
nomeHeaderProjeto.hidden = false;

const nomeProjetoAlterar = document.querySelector('#id_nomeProjeto');

const mainPrincipal = document.querySelector('.main__principal');
const botaoCriarBloco = document.querySelector('.main__botao');

const projeto = await fetch(`http://localhost:3000/projetos/busca/${projetoAberto}`);
const projetoConvertido = await projeto.json();

const blocos = await fetch(`http://localhost:3000/blocos/busca/${projetoAberto}`);
const blocosConvertido = await blocos.json();
//#endregion

//#region EVENTS
nomeHeaderProjeto.addEventListener('click', () => { mostraInputNomeProjeto() });
nomeProjetoAlterar.addEventListener('blur', () => { editaNomeProjeto() });
botaoCriarBloco.addEventListener('click', () => { criarBloco() });
//#endregion

//#region CONTEUDO
async function editarNomeConteudo(nome, idConteudo) {
    if (nome.value.length < 1) {
        return;
    }

    await fetch(`http://localhost:3000/conteudos/${idConteudo}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeConteudo: nome.value
        })
    });

    mostraProjeto();
}

async function alterarConteudo(conteudoAlterado, idConteudo) {
    let conteudoParaAlterar = conteudoAlterado.value;

    if (conteudoAlterado.type == 'file') {
        let nomeImagem = `${Date.now()}-${conteudoAlterado.files[0].name}`

        conteudoParaAlterar = nomeImagem;

        const formData = new FormData();
        formData.append('imagem', conteudoAlterado.files[0])
        formData.append('nomeImagem', nomeImagem);

        criaImagem(formData);
    }

    await fetch(`http://localhost:3000/conteudos/${idConteudo}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            conteudo: conteudoParaAlterar
        })
    });

    async function criaImagem(formData) {
        await fetch(`http://localhost:3000/conteudos/upload`, {
            method: 'POST',
            body: formData
        });
    }

    mostraProjeto();
}

async function excluirConteudo(conteudo, tipoConteudo) {
    if (tipoConteudo == 'imagem') {
        await fetch(`http://localhost:3000/conteudos/imagem/${conteudo.conteudo}`, {method: 'DELETE'});
    }

    await fetch(`http://localhost:3000/conteudos/${conteudo.id}`, {method: 'DELETE'});

    mostraProjeto();
}

async function abrirConteudo(conteudo) {
    const conteudoAberto = await fetch(`http://localhost:3000/conteudos/apresenta/${conteudo.classList[1]}`);
    const conteudoConvertido = await conteudoAberto.json();

    const classe = await fetch(`http://localhost:3000/classes/apresenta/${conteudoConvertido.codClasse}`);
    const classeConvertido = await classe.json();

    let tipoConteudo = '';

    if (classeConvertido.tipoClasse == 'link') {
        tipoConteudo = `
            <input type="text" name="conteudoConteudo" class="cl_conteudoConteudo" id="id_conteudoConteudoLink" value="${conteudoConvertido.conteudo}">
        `
    }

    else if (classeConvertido.tipoClasse == 'imagem') {
        tipoConteudo = `
            <img src="../src/images/imagens_conteudo/${conteudoConvertido.conteudo}" width="300px">
            <input type="file" name="testeArquivo" class="cl_conteudoConteudo" id="id_conteudoConteudoImagem"
            accept=".jpg, .jpeg, .png, .gif">
        `
    }

    else if (classeConvertido.tipoClasse == 'texto') {
        tipoConteudo = `
            <input type="text" name="conteudoConteudo" class="cl_conteudoConteudo" id="id_conteudoConteudoTexto" value="${conteudoConvertido.conteudo}">
        `
    }

    Swal.fire({
        html:`
            <input type="text" name="nomeConteudo" class="cl_nomeConteudo" id="id_nomeConteudo" value="${conteudoConvertido.nomeConteudo}">
            <button id="botao__excluir_conteudo"><i class="fa-solid fa-trash"></i></button>

            <div class="conteudoAberto" id="id_div_descricaoConteudo">
                <h3>Descrição</h3>
                <input type="text"
                name="descricaoConteudo"
                id="id_descricaoConteudo"
                placeholder="Faça sua descrição..."
                value="${conteudoConvertido.descricaoConteudo}">
            </div>

            <div class="conteudoAberto" id="id_div_conteudoConteudo">
                <h3>Conteúdo</h3>
                ${tipoConteudo}
            </div>

            <div class="conteudoAberto" id="id_div_conteudoComentarios">
                <h3>Comentários</h3>
                <input type="text" name="conteudoComentar" id="id_conteudoComentar" placeholder="Faça seu comentário...">

                <div class="comentarios" id="id_div_comentarios">
                    <ul id="id_listaComentarios">
                        <li>
                            <img src="#" alt="foto">
                            <h4 class="nomeUsuarioComentario">Nome do usuário</h4>
                            <span class="comentario">Comentário</span>
                        </li>
                    </ul>
                </div>
            </div>
        `,

        showConfirmButton: false
    });

    const nomeConteudo = document.querySelectorAll('.cl_nomeConteudo');
    const inputConteudo = document.querySelectorAll('.cl_conteudoConteudo');
    const botaoExcluirConteudo = document.querySelector('#botao__excluir_conteudo');

    nomeConteudo.forEach(nome => {
        nome.addEventListener('change', () => { editarNomeConteudo(nome, conteudoConvertido.id) })
    });

    inputConteudo.forEach(conteudo => {
        conteudo.addEventListener('change', () => { alterarConteudo(conteudo, conteudoConvertido.id) });
    });

    botaoExcluirConteudo.addEventListener('click', () => { excluirConteudo(conteudoConvertido, classeConvertido.tipoClasse) });
}
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
        imageHeigth: 1000,

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
            updatedAt: new Date(),
            descricaoConteudo: ''
        })
    });

    mostraProjeto();
}
//#endregion

//#region ALTERA_E_CRIA_INFORMACOES
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
                        id="${classe.id}"
                        value="${classe.nomeClasse}"
                    />
                    <button class="cl_botaoExcluirClasse ${classe.id}" id="botao__excluir_projetos-dentro"><i class="fa-solid fa-trash"></i></button>
                    <button class="botao__main_projetos-dentro ${classe.id} ${classe.tipoClasse}"><i class="fa-solid fa-plus"></i></button>
                </div>
                ${mostraConteudo}
            </div>
        `
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
                <div class="projeto__checkbox ${conteudo.id}">
                    <input type="checkbox" class="conteudo_checkbox" id="${conteudo.id}" ${conteudo.conteudo}/>
                    <input type="text" class="nomeConteudo_checkbox" id="${conteudo.id}" placeholder="Nome do bloco" value="${conteudo.nomeConteudo}"/>
                </div>
            `
        }
        
        else if (classeDoConteudo.tipoClasse == 'link') {
            mostraConteudo += `
                <div class="projeto__link ${conteudo.id} conteudoAbrivel">
                    <label for="projeto__checkbox">
                    <a href="${conteudo.conteudo}">${conteudo.nomeConteudo}</a></label>
                </div>
            `
        }

        else if (classeDoConteudo.tipoClasse == 'imagem') {
            mostraConteudo += `
                <div class="projeto__imagem ${conteudo.id} conteudoAbrivel">
                    <label for="projeto__checkbox">
                    ${conteudo.nomeConteudo}</label>
                </div>
            `
        }

        else if (classeDoConteudo.tipoClasse == 'texto') {
            mostraConteudo += `
                <div class="projeto__texto ${conteudo.id} conteudoAbrivel">
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

function mostraInputNomeProjeto() {
    nomeHeaderProjeto.hidden = true;
    nomeProjetoAlterar.hidden = false;
    nomeProjetoAlterar.focus() = true;
}

async function editaNomeProjeto() {
    if (nomeProjetoAlterar.value != nomeHeaderProjeto.textContent) {
        await fetch(`http://localhost:3000/projetos/${projetoAberto}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                tituloProjeto: nomeProjetoAlterar.value
            })
        });

        mostraProjeto();
    }
    

    nomeHeaderProjeto.hidden = false;
    nomeProjetoAlterar.hidden = true;
}

async function editarNomeBloco(bloco) {
    await fetch(`http://localhost:3000/blocos/${bloco.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeBloco: bloco.value
        })
    });

    mostraProjeto();
}

async function editarNomeClasse(classe) {
    await fetch(`http://localhost:3000/classes/${classe.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeClasse: classe.value
        })
    });

    mostraProjeto();
}

async function excluirClasse(idClasse) {
    const classe = await fetch(`http://localhost:3000/classes/${idClasse}`);
    const classeConvertido = await classe.json();

    const conteudos = await fetch(`http://localhost:3000/conteudos/busca/${classeConvertido.id}`);
    const conteudoConvertido = await conteudos.json();

    conteudoConvertido.forEach(conteudo => {
        excluirConteudo(conteudo, classeConvertido.tipoClasse);
    });

    await fetch(`http://localhost:3000/classes/${idClasse}`, {method: 'DELETE'});
}

async function editarCheckbox(checkbox) {
    await fetch(`http://localhost:3000/conteudos/${checkbox.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeConteudo: checkbox.value
        })
    });

    mostraProjeto();
}

async function marcaCheckbox(checkbox) {
    let valorCheckbox = '';

    if (checkbox.checked) {
        valorCheckbox = 'checked';
    }

    else {
        valorCheckbox = '';
    }

    await fetch(`http://localhost:3000/conteudos/${checkbox.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            conteudo: valorCheckbox
        })
    });
}
//#endregion

mostraProjeto();

async function mostraProjeto() {
    nomeHeaderProjeto.innerHTML = projetoConvertido.tituloProjeto;
    nomeProjetoAlterar.value = projetoConvertido.tituloProjeto;

    mainPrincipal.innerHTML = '';
    
    let i = 0;

    for(const bloco of blocosConvertido) {
        var mostraClasse = await procuraClasse(bloco);

        mainPrincipal.innerHTML += `
            <div class="div__main-projetos bloco${i}">
                <input type="text" class="input__texto" id="${bloco.id}" placeholder="Nome do bloco" value="${bloco.nomeBloco}"/>
                <button class="botao__main_projetos ${bloco.id}">Criar nova classe</button>
                ${mostraClasse}
            </div>
        `;
        
        i++;
    };

    // BOTÕES DE APAGAR CLASSE E BLOCO //
    const botaoExcluirClasse = document.querySelectorAll('.cl_botaoExcluirClasse');

    botaoExcluirClasse.forEach(botao => {
        botao.addEventListener('click', () => { excluirClasse(botao.classList[1]) })
    });

    //#region BOTÕES PARA ADICIONAR CLASSE E CONTEÚDO
    const botaoCriarClasse = document.querySelectorAll('.botao__main_projetos');
    const botaoCriarConteudo = document.querySelectorAll('.botao__main_projetos-dentro');

    botaoCriarClasse.forEach(botao => {
        const idBloco = botao.classList[1];

        botao.addEventListener('click', () => { criarClasse(idBloco) });
    });

    botaoCriarConteudo.forEach(botao => {
        const idClasse = botao.classList[1];
        const tipoClasse = botao.classList[2];

        botao.addEventListener('click', () => { criarConteudo(idClasse, tipoClasse) });
    })
    //#endregion

    //#region INPUT PARA RENOMEAR BLOCO E CLASSE
    const nomeBloco = document.querySelectorAll('.input__texto');
    const nomeClasse = document.querySelectorAll('.input__texto-dentro');
    const nomeCheckbox = document.querySelectorAll('.nomeConteudo_checkbox');

    nomeBloco.forEach(bloco => {
        bloco.addEventListener('change', () => { editarNomeBloco(bloco) });
    });

    nomeClasse.forEach(classe => {
        classe.addEventListener('change', () => { editarNomeClasse(classe) });
    });

    nomeCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => { editarCheckbox(checkbox) })
    });
    //#endregion

    //#region BOTÕES PARA ABRIR CONTEÚDO
    const botaoConteudo = document.querySelectorAll('.conteudoAbrivel');
    const valorCheckbox = document.querySelectorAll('.conteudo_checkbox');

    botaoConteudo.forEach(botao => {
        botao.addEventListener('click', () => { abrirConteudo(botao) });
    });

    valorCheckbox.forEach(checkbox => {
        checkbox.addEventListener('click', () => { marcaCheckbox(checkbox) })
    });
    //#endregion

    //#region MOSTRAR PARTICIPANTES
    const participantes = await fetch(`http://localhost:3000/participantes/${projetoAberto}`);
    const participantesConvertido = await participantes.json();
    const listaParticipantes = document.querySelector('#id_listaParticipantes');

    participantesConvertido.forEach(async participante => {
        const participanteEmail = await fetch(`http://localhost:3000/usuarios/${participante.codUsuario}`);
        const participanteEmailConvertido = await participanteEmail.json();

        listaParticipantes.innerHTML += `
            <li>${participanteEmailConvertido.email}</li>
        `
    })
    //#endregion
}

// BOTÃO PARA ADICIONAR PARTICIPANTES NO PROJETO
const botaoAdicionaPessoa = document.querySelector('.add__pessoas__botao');
const menuPessoasAdicionadas = document.querySelector('#pessoasContainer');
const campoPessoa = document.querySelector('.input_nome');

//#region FUNÇÃO PARA ADICIONAR PARTICIPANTES NO PROJETO
async function enviarParaServidor(nome) {
    const participante = await fetch(`http://localhost:3000/usuarios/email/${nome}`);
    const participanteConvertido = await participante.json();

    if (participanteConvertido) {
        const response = await fetch('http://localhost:3000/participantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codUsuario: participanteConvertido.id,
                codProjeto: projetoAberto
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar participante.');
        }
    }

    else {
        alert('Usuário não existe.');
        return;
    }
}

// Função async para adicionar pessoa ao projeto

async function adicionaPessoas_Projeto() {
    const nome = campoPessoa.value;

    if (!nome) {
        alert("Email inválido.");
        return;
    }

    try {
        const resposta = await enviarParaServidor(nome);
        console.log(resposta);
    } catch (erro) {
        alert(`${erro}, ERRO`);
    }
}

botaoAdicionaPessoa.addEventListener('click', () => { adicionaPessoas_Projeto() });
//#endregion