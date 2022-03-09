const pool= require('../db')



const getAllProductos = async(req, res, next) => {
    try {
        const AllProductos=await pool.query('SELECT * FROM PRODUCTOS')
        res.json(AllProductos.rows)
    } catch (error) {
        next(error);
    }
}
const getAllProductosA = async(req, res, next) => {
    try {
        const{ID}= req.params
        const AllProductos=await pool.query(`SELECT PRECIO,MATERIAL,CATEGORIA,PRODUCTOS.DESCRIPCION FROM ARTESANOS RIGHT JOIN PRODUCTOS ON ARTESANOS.ID = PRODUCTOS.ID_ARTESANO WHERE PRODUCTOS.ID_ARTESANO = '${ID}'`);
        console.log(ID)
        res.json(AllProductos.rows)
    } catch (error) {
        next(error);
    }
}

const getProducto = async(req, res, next) => {
    try {
        const{ID}= req.params
        const result=await pool.query('SELECT * FROM PRODUCTOS WHERE ID=$1',[ID])
        if(result.rows.length ===0) 
        return res.status(404).json({
            message: "producto no encontrado",
        });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const CreateProducto = async (req, res, next) => {
    try {
        const {PRECIO,ID_ARTESANO,MATERIAL,CATEGORIA,DESCRIPCION} =req.body;
        const result= await pool.query(
            "INSERT INTO PRODUCTOS(PRECIO,ID_ARTESANO,MATERIAL,CATEGORIA,DESCRIPCION)VALUES($1,$2,$3,$4,$5)",
            [PRECIO,ID_ARTESANO,MATERIAL,CATEGORIA,DESCRIPCION]);-
            res.json(result.rows[0])
    } catch (error) {
        next(error);
       res.json({error:error.message});
    }



}
const DeleteProducto =async (req, res, next) => {
    try {
        const{ID}= req.params;
        const result=await pool.query('DELETE FROM PRODUCTOS WHERE ID= $1',[ID]);

        if(result.rowCount ===0) 
            return res.status(404).json({
            message: "producto no encontrado",
            });
        return res.sendStatus(204);  
    } catch (error) {
        next(error);
    }

};

const UpdateProducto = async (req, res, next) => {
    try {
        const{ID} = req.params;
        const{PRECIO,ID_ARTESANO,MATERIAL,CATEGORIA,DESCRIPCION}= req.body;
    
        const result= await pool.query(
            'Delete PRODUCTOS SET PRECIO=$1, ID_ARTESANO=$2,MATERIAL=$3,CATEGORIA=$4,DESCRIPCION=$5 WHERE ID=$6',
            [PRECIO,ID_ARTESANO,MATERIAL,CATEGORIA,DESCRIPCION,ID]
        );
    
        if(result.rows.length ===0) 
            return res.status(404).json({
                message: "producto no encontrado",
            });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProductos,getProducto, CreateProducto, DeleteProducto, UpdateProducto,getAllProductosA
}