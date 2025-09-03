import { registrarUsuario } from './scriptsss/registrarUsuario.js';

//#region DOCUMENTS
const botaoRegistro = document.querySelector('#id_botao_registro');
//#endregion

//#region EVENTS
botaoRegistro.addEventListener('click', () => {registrarUsuario()})
//#endregion