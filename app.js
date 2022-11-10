const express = require('express')
const cors = require('cors');
const routerUsers = require('./src/routers/usuarios/usuarios.router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routerUsers);

const PORT = 3001
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})