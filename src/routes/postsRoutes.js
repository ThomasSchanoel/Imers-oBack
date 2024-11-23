import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};


const storage = multer.diskStorage({ //função necessária para o funcionamento do multer
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});


const routes = (app) => {
    app.use(express.json()); //dizendo ao servidor que ele vai devolver um json
    app.use(cors(corsOptions));
    app.get("/posts", listarPosts); //app.get rota para pegar algo de algum lugar
    app.post("/posts", postarNovoPost) //rota para criar um novo post
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
