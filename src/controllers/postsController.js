import {getTodosPosts, criarPosts, atualizarPosts} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) { // get define a rota, sendo /posts a rota; res: resposta req: requisição
    const posts = await getTodosPosts();
    res.status(200).json(posts); // 200 é o codigo http de ok
} 

export async function postarNovoPost(req, res) {
    const novoPost = req.body; //req.body -> corpo da requisição
    try {
        const postCriado = await criarPosts(novoPost);
        res.status(200).json(postCriado);
    }catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }; 

    try{
        const postCriado = await criarPosts(novoPost);
        const imagemAtualizda = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizda);
        res.status(200).json(postCriado);
    }catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id; //id do post que será atualizado
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPosts(id, post);
        res.status(200).json(postCriado);
    }catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}
