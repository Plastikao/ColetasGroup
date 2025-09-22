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

async function adicionaPessoas_Projeto(emailAdicionado, projetoId) {
    const email = emailAdicionado.value;

    if (!email) {
        alert("Email inválido.");
        return;
    }

    try {
        const resposta = await enviarParaServidor(email, projetoId);
        console.log(resposta);
    } catch (erro) {
        alert(`${erro}, ERRO`);
    }
}

async function enviarParaServidor(email, projetoId) {
    const participante = await fetch(`http://localhost:3000/usuarios/email/${email}`);
    const participanteConvertido = await participante.json();

    if (participanteConvertido) {
        const response = await fetch('http://localhost:3000/participantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codUsuario: participanteConvertido.id,
                codProjeto: projetoId
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

async function editarNomeProjeto(nomeAtualProjeto, novoNomeProjeto, projetoId) {
    if (nomeAtualProjeto != novoNomeProjeto.value) {
        await fetch(`http://localhost:3000/projetos/${projetoId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                tituloProjeto: novoNomeProjeto.value
            })
        });

        mostraProjetos();
    }
}

async function apagarProjeto(projetoId) {
    const blocos = await fetch(`http://localhost:3000/blocos/busca/${projetoId}`);
    const blocosConvertido = await blocos.json();

    const participantes = await fetch(`http://localhost:3000/participantes/${projetoId}`);
    const participantesConvertido = await participantes.json();

    for (const bloco of blocosConvertido) {
        await excluirBloco(bloco.id);
    }

    for (const participante of participantesConvertido) {
        await fetch(`http://localhost:3000/participantes/${participante.id}`, {method: 'DELETE'});
    }

    await fetch(`http://localhost:3000/projetos/${projetoId}`, {method: 'DELETE'});

    mostraProjetos();
}

async function excluirBloco(idBloco) {
    const bloco = await fetch(`http://localhost:3000/blocos/excluir/${idBloco}`);
    const blocoConvertido = await bloco.json();

    const classes = await fetch(`http://localhost:3000/classes/busca/${blocoConvertido.id}`);
    const classesConvertido = await classes.json();

    for (const classe of classesConvertido) {
        await excluirClasse(classe.id);
    }
    
    await fetch(`http://localhost:3000/blocos/${idBloco}`, {method: 'DELETE'});
}

async function excluirClasse(idClasse) {
    const classe = await fetch(`http://localhost:3000/classes/${idClasse}`);
    const classeConvertido = await classe.json();

    const conteudos = await fetch(`http://localhost:3000/conteudos/busca/${classeConvertido.id}`);
    const conteudoConvertido = await conteudos.json();

    for (const conteudo of conteudoConvertido) {
        await excluirConteudo(conteudo, classeConvertido.tipoClasse);
    };
    
    await fetch(`http://localhost:3000/classes/${idClasse}`, {method: 'DELETE'});
}

async function excluirConteudo(conteudo, tipoConteudo) {
    if (tipoConteudo == 'imagem') {
        await fetch(`http://localhost:3000/conteudos/imagem/${conteudo.conteudo}`, {method: 'DELETE'});
    }

    await fetch(`http://localhost:3000/conteudos/${conteudo.id}`, {method: 'DELETE'});
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
                        <p class="nomeProjeto${projeto.id}">${projeto.tituloProjeto}</p><i class="cl_botaoMenuProjetos ${i} fa-solid fa-ellipsis"></i>
                    </section>

                    <section class="cl_menuProjetos ${i}" style="display: none;">
                        <ul>
                            <li class="cl_botaoCompartilhar ${projeto.id}"><i class="fa-solid fa-user"></i> Compartilhar</li>
                            <li class="cl_botaoRenomear ${projeto.id}"><i class="fa-solid fa-gear"></i> Renomear</li>
                            <li class="cl_botaoApagar ${projeto.id}"><i class="fa-solid fa-trash"></i> Apagar</li>
                        </ul>
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

            const botaoMenuProjetos = document.querySelectorAll('.cl_botaoMenuProjetos');
            const botaoCompartilhar = document.querySelectorAll('.cl_botaoCompartilhar');
            const botaoRenomear = document.querySelectorAll('.cl_botaoRenomear');
            const botaoApagar = document.querySelectorAll('.cl_botaoApagar');
            const mudaStatus = document.querySelectorAll(`.${statusAtual}`);
            const selectStatus = document.querySelector(`#mudaCor${i}`);

            selectStatus.classList.add(statusAtual);
            selectStatus.classList.add(projeto.id)

            botaoMenuProjetos.forEach(botao => {
                botao.addEventListener('click', () => {
                    const menuProjeto = document.getElementsByClassName(`cl_menuProjetos ${botao.classList[1]}`);

                    if (menuProjeto[0].style.getPropertyValue('display') == 'block') {
                        menuProjeto[0].style = 'display: none;';
                    }
                    
                    else {
                        menuProjeto[0].style = 'display: block;';
                    }
                });
            });

            botaoCompartilhar.forEach(botao => {
                botao.addEventListener('click', () => {
                    Swal.fire({
                        html: `
                            <div class="add__pessoas">
                                <input type="text" class="input_email" placeholder="Email do Participante">
                            </div>
                        `,
                        showDenyButton: true,
                        confirmButtonText: "Adicionar",
                        denyButtonText: `Cancelar`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const campoPessoa = document.querySelector('.input_email');

                            adicionaPessoas_Projeto(campoPessoa, botao.classList[1]);
                        }
                    });
                });
            });

            botaoRenomear.forEach(botao => {
                botao.addEventListener('click', () => {
                    const nomeAtualProjeto = document.querySelector(`.nomeProjeto${botao.classList[1]}`).textContent

                    Swal.fire({
                        html: `
                            <div class="div_cl_renomearProjeto">
                                <input type="text" class="input_nomeProjeto" placeholder="Nome do Projeto" value="${nomeAtualProjeto}">
                            </div>
                        `,
                        showDenyButton: true,
                        confirmButtonText: "Renomear",
                        denyButtonText: `Cancelar`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const novoNomeProjeto = document.querySelector('.input_nomeProjeto');

                            editarNomeProjeto(nomeAtualProjeto, novoNomeProjeto, botao.classList[1]);
                        }
                    });
                })
            })

            botaoApagar.forEach(botao => {
                botao.addEventListener('click', () => {
                    const nomeProjeto = document.querySelector(`.nomeProjeto${botao.classList[1]}`).textContent;

                    Swal.fire({
                        title: `Tem certeza que deseja apagar ${nomeProjeto}?`,
                        showDenyButton: true,
                        confirmButtonText: "Apagar",
                        denyButtonText: `Cancelar`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            apagarProjeto(botao.classList[1]);
                        }
                    });
                });
            });

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