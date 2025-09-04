//#region DOCUMENTS
const botaoLogin = document.querySelector('#id_botao_login');
const nomeOuEmail = document.querySelector('#usuario_section');
const senha = document.querySelector('#senha_section');
//#endregion

//#region EVENTS
botaoLogin.addEventListener('click', () => {logarUsuario(nomeOuEmail.value, senha.value)})
//#endregion

async function logarUsuario(nomeOuEmail, senha) {
    if (nomeOuEmail.length > 0 && senha.length > 0) {
        let tempNomeEmail = '';
        let tempSenha = '';

        // BUSCA EMAIL OU NOME
        tempNomeEmail = await (await fetch(`http://localhost:3000/usuarios/nome/${nomeOuEmail}`)).json();

        if (tempNomeEmail == null) {
            tempNomeEmail = await fetch(`http://localhost:3000/usuarios/email/${nomeOuEmail}`);
        }

        // BUSCA SENHA
        tempSenha = await fetch(`http://localhost:3000/usuarios/senha/${senha}`);
    
        const nomeEmailConvertido = tempNomeEmail;
        const senhaConvertida = await tempSenha.json();
    
        console.log(nomeEmailConvertido + "\n" + senhaConvertida);

        if (nomeEmailConvertido == null || senhaConvertida == null) {
            alert('Usuário não existe.');
        }

        else {
            window.localStorage.setItem('usuario', nomeEmailConvertido)

            window.location.href = './paginas/paginainicial.html';
        }
    }

    else {
        alert('Faltam informações.');
    }
}