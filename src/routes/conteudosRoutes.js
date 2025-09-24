const { Router } = require('express');
const ConteudoController = require('../controllers/ConteudoController.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const conteudoController = new ConteudoController();

const router = Router();

//#region UPLOAD_IMAGEM_CONTEUDO
const pastaDeUpload = path.join(__dirname, '..', 'images', 'imagens_conteudo')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pastaDeUpload);
    },
    filename: (req, file, cb) => {
        const nomeUnico = Date.now() + '-' + file.originalname;
        cb(null, nomeUnico);
    }
});

const upload = multer({ storage });

router.post('/conteudos/upload', upload.single('imagem'), (req, res) => {
    const nomeImagem = req.body.nomeImagem;

    const caminhoAntigo = req.file.path;
    const extensao = path.extname(req.file.originalname);
    const novoCaminho = path.join(req.file.destination, nomeImagem);

    fs.rename(caminhoAntigo, novoCaminho, (erro) => {
        if (erro) {
            console.log(`\n\n\n\nSeu erro foi ${erro}\n\n\n\n`);
            return res.status(500).json({ erro: '\n\n\n\nErro ao renomear o arquivo\n\n\n\n' });
        }

        res.status(201).json({ mensagem: '\n\n\n\nSalvo com sucesso\n\n\n\n', nomeImagem });
    });
});
//#endregion

//#region DELETAR_IMAGEM
router.delete('/conteudos/imagem/:nomeImagem', (req, res) => {
    const nomeImagem = req.params.nomeImagem;
    const caminhoImagem = path.join(pastaDeUpload, nomeImagem);

    fs.access(caminhoImagem, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ erro: 'Imagem não encontrada.' });
        }

        fs.unlink(caminhoImagem, (erro) => {
            if (erro) {
                console.error(`Erro ao deletar imagem: ${erro}`);
                return res.status(500).json({ erro: 'Erro ao deletar a imagem.' });
            }

            res.status(200).json({ mensagem: 'Imagem deletada com sucesso.' });
        });
    });
});
//#endregion

router.get('/conteudos/busca/:idClasse', (req, res) => conteudoController.pegaConteudos(req, res));
router.get('/conteudos/apresenta/:idConteudo', (req, res) => conteudoController.pegaUmConteudo(req, res));
router.get('/conteudos/checkbox/:idProjeto', (req, res) => conteudoController.pegaCheckbox(req, res));
router.post('/conteudos', (req, res) => conteudoController.criaNovo(req, res));
router.put('/conteudos/:id', (req, res) => conteudoController.atualiza(req, res));
router.delete('/conteudos/:id', (req, res) => conteudoController.exclui(req, res));

module.exports = router;