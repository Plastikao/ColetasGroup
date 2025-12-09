var proprietario = JSON.parse(window.localStorage.getItem('usuarioStorage'));
const novaSenha = document.querySelector(".text_senhas1")
const confirmarNovaSenha = document.querySelector(".text_senhas2")
const senhaAtual = document.querySelector(".text_senhas3")
const btEditaSenha = document.querySelector("#bt_altera_senha")


console.log(proprietario.nome);

btEditaSenha.addEventListener('click', () =>{
    editarSenha()
} )

async function editarSenha() {
    const senha = await fetch(`http://localhost:3000/usuarios/senha/${senhaAtual.value}`);
    const senhaConvertida = await senha.json();

    if(!senhaAtual.value){
        alert("Algum campo vazio!")
        return
    }

    if (novaSenha.value.length >= 6) {
        for (let i = 0; i < novaSenha.value.length - 2; i++) { // -2 para evitar acessar indices fora
            // Verifica se os 3 caracteres são números
            if (
                !isNaN(novaSenha.value[i]) &&
                !isNaN(novaSenha.value[i + 1]) &&
                !isNaN(novaSenha.value[i + 2])
            ) {
                const num1 = parseInt(novaSenha.value[i]);
                const num2 = parseInt(novaSenha.value[i + 1]);
                const num3 = parseInt(novaSenha.value[i + 2]);

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

    if (!novaSenha.value || !confirmarNovaSenha.value) {
        alert("Preencha todos os campos de senha.");
        return;
    }

    if (!senhaConvertida) {
        alert("Senha incorreta.")
        return
    }

    if(novaSenha.value != confirmarNovaSenha.value){
        alert("Verfique novamente seus campos de Senha")
        return
    }

   try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${proprietario[0]}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senha: novaSenha.value
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar senha.");
        }

        proprietario[3] = novaSenha.value;

        window.localStorage.setItem('usuarioStorage', JSON.stringify(proprietario));

        alert("Senha alterada com sucesso!");

    } catch (erro) {
        console.error(erro);
        alert("Erro ao trocar a senha.");
    }
}

const nome = document.querySelector("#usuario_section")


