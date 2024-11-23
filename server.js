import express from "express";
import routes from "./src/routes/postsRoutes.js";

//a conexão entre o back e o front é feita pelo arquivo json


const app = express();
app.use(express.static("uploads")); //abrir serviços estáticos, pasta upload
routes(app);

app.listen(3000, () => { // 3000 seria tipo uma porta, tipo uma senha, usada para deixar o servidor aberto localmente
    console.log("servidor escutando...");
});





