import { useEffect, useState } from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom';



export default function Productoslist() {

    const[PRODUCTOS,setProductos]=useState([]);
    const navigate= useNavigate(); 
    const params = useParams();


    const loadPRODUCTOS = async (req, res)  =>{
        try {
            const{id}= req.params.id;
            console.log(id);
            const response = await fetch(`http://localhost:4000/artesanos/${id}/productos`);
            const data= await response.json();
            setProductos(PRODUCTOS.filter(PRODUCTOS => PRODUCTOS.id_artesanos ===id));
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete= async(id) =>{
        try {
            const res= await fetch(`http://localhost:4000/productos/${id}`,{
                method: "DELETE",
                })
            setProductos(PRODUCTOS.filter(PRODUCTOS => PRODUCTOS.id !==id ));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        loadPRODUCTOS();
    },[]);

    return (
<>
        <h1>Lista de productos</h1>
        <Button 
        variant='contained' 
        color='primary'
        onClick={()=>navigate("/productos/new")}
        style={{marginLeft:".5rem"}}>
            Registrar Productos
        </Button>
        <Button 
        variant='contained' 
        color='primary'
        onClick={()=>navigate("/")}
        style={{marginLeft:".5rem"}}>
            Volver
        </Button>
        {
            PRODUCTOS.map((PRODUCTOS) =>(
                <Card style={{
                    marginBottom: "1rem",
                    backgroundColor: "#1e272e"
                }}
                key={PRODUCTOS.id}
                >
                    <CardContent style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div style={{color:'white'}}>                     
                            <Typography>Precio: ${PRODUCTOS.precio}</Typography>
                            <Typography>Material: {PRODUCTOS.material}</Typography>
                            <Typography>Categoria: {PRODUCTOS.categoria}</Typography>
                            <Typography>Descripcion: {PRODUCTOS.descripcion}</Typography>
                        </div>

                        <div>
                            <Button variant='contained' color='inherit' onClick={()=> navigate(`/productos/${PRODUCTOS.id}/edit`)}>
                                Editar
                            </Button>
                            <Button variant='contained' color='warning' onClick={()=> handleDelete(PRODUCTOS.id)} style={{marginLeft:".5rem"}}>
                                Borrar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))
        }
        </>
    );
}

