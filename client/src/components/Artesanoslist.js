import { useEffect, useState } from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom';



export default function Artesanoslist() {

    const[ARTESANOS,setArtesanos]=useState([]);
    const navigate= useNavigate(); 
    const params = useParams();
    const loadARTESANOS = async () =>{
        const response = await fetch('http://localhost:4000/artesanos');
        const data= await response.json();
        setArtesanos(data);
    }

    const handleDelete= async(id) =>{
        try {
            const res= await fetch(`http://localhost:4000/artesanos/${id}`,{
                method: "DELETE",
                })
            setArtesanos(ARTESANOS.filter(ARTESANOS => ARTESANOS.id !==id ));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        loadARTESANOS();
    },[]);

    return (
<>
        <h1>Lista de artesanos</h1>
        <Button 
        variant='contained' 
        color='primary'
        onClick={()=>navigate("/artesanos/new")}
        style={{marginLeft:".5rem"}}>
            Registrar artesanos
        </Button>
        
        {
            ARTESANOS.map((ARTESANOS) =>(
                <Card style={{
                    marginBottom: "1rem",
                    backgroundColor: "#1e272e"
                }}
                key={ARTESANOS.id}
                >
                    <CardContent style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div style={{color:'white'}}>                   
                            <Typography>RUT: {ARTESANOS.rut}</Typography>
                            <Typography>NOMBRE: {ARTESANOS.nombre}</Typography>
                            <Typography>contrasena: {ARTESANOS.contrasena}</Typography>
                            <Typography>RUBRO: {ARTESANOS.rubro}</Typography>
                            <Typography>NUMERO_TELEFONO: {ARTESANOS.numero_telefono}</Typography>
                            <Typography>DIRECCION: {ARTESANOS.direccion}</Typography>
                            <Typography>DESCRIPCION: {ARTESANOS.descripcion}</Typography>
                        </div>

                        <div>
                            <Button variant='contained' color='inherit' onClick={()=> navigate(`/artesanos/${ARTESANOS.id}/edit`)}>
                                Editar
                            </Button>
                            <Button variant='contained' color='warning' onClick={()=> handleDelete(ARTESANOS.id)} style={{marginLeft:".5rem"}}>
                                Borrar
                            </Button>
                            <Button variant='contained' color='warning' onClick={()=> navigate(`/artesanos/${ARTESANOS.id}/productos`)} style={{marginLeft:".5rem"}}> 
                                Productos
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))
        }
        </>
    );
}
