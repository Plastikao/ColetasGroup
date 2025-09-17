//#region DOCUMENTS
const botaoRegistro = document.querySelector('#id_botao_registro');
//#endregion

//#region EVENTS
botaoRegistro.addEventListener('click', () => {registrarUsuario()})
//#endregion

async function registrarUsuario() {
    let emailRegistro = [document.querySelector('#email_section').value, false];
    let usuarioRegistro = document.querySelector('#usuario_section').value;
    let senhaRegistro = [document.querySelector('#senha_section').value, false];
    let confirmaSenhaRegistro = [document.querySelector('#confirmarSenha_section').value, false];

    if (emailRegistro[0].length > 0 &&
        usuarioRegistro.length > 0 &&
        senhaRegistro[0].length > 0 &&
        confirmaSenhaRegistro[0].length > 0
    ) {
        emailRegistro[1] = analisaEmail(emailRegistro[0]);
        senhaRegistro[1] = analisaSenha(senhaRegistro[0]);
        confirmaSenhaRegistro[1] = confirmaSenha(senhaRegistro[0], confirmaSenhaRegistro[0]);

        const emailExiste = await fetch(`http://localhost:3000/usuarios/email/${emailRegistro[0]}`);
        const emailExisteConvertido = await emailExiste.json();

        if (emailExisteConvertido != null) {
            alert('Esse email já está registrado.');
            return;
        }

        else {
            if (emailRegistro[1] && senhaRegistro[1] && confirmaSenhaRegistro[1]) {
                const registro = await fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: usuarioRegistro,
                        email: emailRegistro[0],
                        senha: senhaRegistro[0],
                        criacaoConta: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                });
            
                window.history.back();
            }
        }
    }

    else {
        alert('Faltam informações.');
    }
}

function analisaEmail(email) {
    let nomeEmail = false;
    let separadorEmail = false;
    let preDominioEmail = false;
    let dominioEmail = false;

    for (let i = 0; i < email.length; i++) {
        if (email[i] == ' ') {
            return false;
        }

        // NOME DO EMAIL
        if (!nomeEmail) {
            if (email[i] != '@') {
                nomeEmail = true;
            }
        }

        // SEPARADOR DO EMAIL (@)
        if (nomeEmail &&
            !separadorEmail
        ) {
            if (email[i] == '@') {
                separadorEmail = true;
            }
        }

        // PRÉ DOMÍNIO DO EMAIL (gmail, hotmal, etc.)
        if (nomeEmail &&
            separadorEmail &&
            email[i] != '@'
        ) {
            preDominioEmail = true;
        }

        // DOMÍNIO DO EMAIL (.com, .com.br, .gov, etc.)
        if (nomeEmail &&
            separadorEmail &&
            preDominioEmail
        ) {
            if (email.substr(-3) == '.br' ||
                email.substr(-4) == '.com' ||
                email.substr(-4) == '.gov' ||
                email.substr(-4) == '.net' ||
                email.substr(-4) == '.org' ||
                email.substr(-4) == '.biz' ||
                email.substr(-5) == '.info'
            ) {
                dominioEmail = true;
            }
        }
    }

    if (
        nomeEmail &&
        separadorEmail &&
        preDominioEmail &&
        dominioEmail
    ) {
        return true;
    }

    else {
        return false;
    }
}

function analisaSenha(senha) {
    if (senha.length >= 6) {
        for (let i = 0; i < senha.length; i++) {
            if (!isNaN(senha[i]-1) && i != senha.length) {
                if (parseInt(senha[i+1]) == parseInt(senha[i])+1 && parseInt(senha[i+2]) == parseInt(senha[i+1])+1) {
                    alert('A senha não pode conter números sequenciais.');
                    return false;
                }
            }
        }
    }

    else {
        alert('A senha deve ter, no mínimo, 6 caracteres.');
        return false;
    }

    return true;
}

function confirmaSenha(senha, confirmaSenha) {
    if (senha === confirmaSenha) {
        return true;
    }

    else {
        return false;
    }
}