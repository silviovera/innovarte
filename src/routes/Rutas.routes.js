const { Router } = require("express");
const pool = require('../db');
const { getAllProductos, CreateProducto, DeleteProducto, UpdateProducto, getProducto, getAllProductosA} = require('../controllers/productos.controllers');
const { getAllArtesanos,getArtesano, CreateArtesano, DeleteArtesano, UpdateArtesano } = require('../controllers/artesanos.controllers');
const router = Router();


router.get('/artesanos/:ID/productos', getAllProductosA)
router.get('/productos', getAllProductos)
router.get('/productos/:ID', getProducto)
router.post('/productos', CreateProducto)
router.delete('/productos/:ID', DeleteProducto)
router.put('/productos/:ID', UpdateProducto)
router.get('/artesanos', getAllArtesanos)
router.get('/artesanos/:ID', getArtesano)
router.post('/artesanos', CreateArtesano)
router.delete('/artesanos/:ID', DeleteArtesano)
router.put('/artesanos/:ID', UpdateArtesano)
module.exports = router;