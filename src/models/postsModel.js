import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts(){
    const db = conexao.db("imersao-instalike");// acessa o banco
    const colecao = db.collection("posts");//acessa a coleção
    return colecao.find().toArray();
}

export async function criarPosts(novoPost) {
    const db = conexao.db("imersao-instalike");// acessa o banco
    const colecao = db.collection("posts");//acessa a coleção
    return colecao.insertOne(novoPost);
}

export async function atualizarPosts(id, novoPost) {
    const db = conexao.db("imersao-instalike");// acessa o banco
    const colecao = db.collection("posts");//acessa a coleção
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}