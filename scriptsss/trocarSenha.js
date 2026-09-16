const botaoLogin = document.querySelector('#id_botao_login')
const nomeOuEmail = document.querySelector('#usuario_section')
const localSenha = document.querySelector('#senha_section')
const troca_senha = document.querySelector('#nova_Senha_section')
const botaoTrocaSenha = document.querySelector('#id_botaoEntrar')

botaoTrocaSenha.addEventListener('click', trocaSenha)


async function trocaSenha() {
    const usuarioEmail = await fetch(`http://localhost:3000/usuarios/email/${nomeOuEmail.value}`)
    const usuarioEmailConvertido = await usuarioEmail.json();

    //const usuarioStorage = window.localStorage.getItem('usuarioStorage');
    //const [id] = usuarioStorage.split(',');

    if(!nomeOuEmail.value){
        alert("Campo de usuário vazio!")
    }

    if (troca_senha.value.length >= 6) {
    for (let i = 0; i < troca_senha.value.length - 2; i++) { // -2 para evitar acessar indices fora
        // Verifica se os 3 caracteres são números
        if (
            !isNaN(troca_senha.value[i]) &&
            !isNaN(troca_senha.value[i + 1]) &&
            !isNaN(troca_senha.value[i + 2])
        ) {
            const num1 = parseInt(troca_senha.value[i]);
            const num2 = parseInt(troca_senha.value[i + 1]);
            const num3 = parseInt(troca_senha.value[i + 2]);

            if (num2 === num1 + 1 && num3 === num2 + 1) {
                alert('A senha não pode conter números sequenciais.');
                return; // Para a execução
            }
        }
    }
} else {
    alert('A senha deve ter, no mínimo, 6 caracteres.');
    return;
}


    if (!localSenha.value.trim() || !troca_senha.value.trim()) {
            alert("Preencha todos os campos de senha.");
            return;
    }

    if (!usuarioEmailConvertido) {
        alert("Usuário não existe!")
        return
    }

    if(localSenha.value != troca_senha.value){
        alert("Verfique novamente seus campos de Senha")
        return
    }

    try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${usuarioEmailConvertido.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senha: troca_senha.value
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar senha.");
        }

        window.location.href = './../index.html';
        alert("Senha alterada com sucesso!");

    } catch (erro) {
        console.error(erro);
        alert("Erro ao trocar a senha.");
    }
}