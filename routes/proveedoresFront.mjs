import express from 'express';

const ruta = express.Router();
ruta.use('/', express.static("public"));

export default ruta;
