var progresso = 25;

for (let i = 0; i <= 5; i++) {
    const bloco = document.querySelector('.mainBlocos');

    // CÓDIGO EXEMPLO PARA PORCENTAGEM DA BARRA
    /*
    if (i == 3) {
        progresso = 50;
    }

    else if (i == 5) {
        progresso = 75;
    }

    else {
        progresso = 20;
    }*/

    bloco.innerHTML +=
    `<div class="meio_bloco">
        <section class="bloco_config">
            <p>Nome do projeto</p> <i class="fa-solid fa-ellipsis"></i>
        </section>

        <section class="bloco_config branco">
        </section>

        <section class="bloco_config blocoBarra">
            <div class="barra" id="barraDentro">
                <div class="barraProgessoAumento" id="barraProgesso" style="width: ${progresso}%;"></div>
            </div>

            <div id="mudaCor"></div>
        </section>
    </div>`

    // CÓDIGO ANTIGO SEM ALTERAR A ORDEM DAS DIV DA BARRA DE PROGRESSO
    /*
    `<div class="meio_bloco">
        <section class="bloco_config">
            <p>Nome do projeto</p> <i class="fa-solid fa-ellipsis"></i>
        </section>

        <section class="bloco_config branco">
        </section>

        <section class="bloco_config blocoBarra">
            <div class="barraProgessoAumento" id="barraProgesso">
                <div class="barra" id="barra_dentro"></div>
            </div>

            <div id="mudaCor"></div>
        </section>
    </div>`*/
}