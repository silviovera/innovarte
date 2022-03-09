const pool= require('../db')



const getAllArtesanos = async(req, res, next) => {
    try {
        const AllArtesanos=await pool.query('SELECT * FROM ARTESANOS')
        res.json(AllArtesanos.rows)
    } catch (error) {
        next(error);
    }
}

const getArtesano = async(req, res, next) => {
    try {
        const{ID}= req.params
        const result=await pool.query('SELECT * FROM ARTESANOS WHERE ID=$1',[ID])
        if(result.rows.length ===0) 
        return res.status(404).json({
            message: "Artesano no encontrado",
        });
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const CreateArtesano = async (req, res, next) => {
    try {
        const {RUT,CONTRASENA,NOMBRE,RUBRO,NUMERO_TELEFONO,DIRECCION,DESCRIPCION} =req.body;
        const result= await pool.query(
            "INSERT INTO ARTESANOS(RUT,CONTRASENA,NOMBRE,RUBRO,NUMERO_TELEFONO,DIRECCION,DESCRIPCION)VALUES($1,$2,$3,$4,$5,$6,$7)",
            [RUT,CONTRASENA,NOMBRE,RUBRO,NUMERO_TELEFONO,DIRECCION,DESCRIPCION]);-
            res.json(result.rows[0])
    } catch (error) {
        next(error);
       res.json({error:error.message});
    }



}
const DeleteArtesano =async (req, res, next) => {
    try {
        const{ID}= req.params;
        const result=await pool.query('DELETE FROM ARTESANOS WHERE ID= $1',[ID]);

        if(result.rowCount ===0) 
            return res.status(404).json({
            message: "artesano no encontrado",
            });
        return res.sendStatus(204);  
    } catch (error) {
        next(error);
    }

};

const UpdateArtesano = async (req, res, next) => {
    
    try {
        const{ID} = req.params;
        const{RUT,CONTRASENA,NOMBRE,RUBRO,NUMERO_TELEFONO,DIRECCION,DESCRIPCION}= req.body;
    
        const result= await pool.query(
            'UPDATE ARTESANOS SET RUT=$1, CONTRASENA=$2,NOMBRE=$3,RUBRO=$4,NUMERO_TELEFONO=$5,DIRECCION=$6,DESCRIPCION=$7 WHERE ID=$8 ',
            [RUT,CONTRASENA,NOMBRE,RUBRO,NUMERO_TELEFONO,DIRECCION,DESCRIPCION,ID]
        );
    
        if(result.rows.length ===0) 
            return res.status(404).json({
                message: "artesano no encontrado",
            });
            
        return res.json(result.rows[0]);
        
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllArtesanos,getArtesano, CreateArtesano, DeleteArtesano, UpdateArtesano
}