for (let i = 0; i <= 5; i++) {
    const bloco = document.querySelector('.mainBlocos');

    bloco.innerHTML += `<div class="meio_bloco">
        <section class="bloco_config">
            <p>Nome do projeto</p> <i class="fa-solid fa-ellipsis"></i>
        </section>
        <section class="bloco_config branco">

        </section>

        <section class="bloco_config blocoBarra" >
            <div class="barraProgessoAumento" id="barraProgesso">
                <div class="barra" id="barra_dentro"> </div>
            </div>

            <div id="mudaCor"></div>
        </section>
    </div>`
}