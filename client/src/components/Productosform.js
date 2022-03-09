import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography,  } from '@mui/material'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

export default function Productosform() {
    const [producto, setproducto] = useState({
        PRECIO: '',
        ID_ARTESANO:'',
        MATERIAL: '',
        CATEGORIA: '',
        DESCRIPCION: ''        
        });

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const alerta = () => {
        swal({
            title: "Campos vacios",
            text: "porfavor asegurese de rellenar todos los campos",
            button: "aceptar",
            icon: "warning"
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (producto.PRECIO ==='' || producto.PRECIO ===null || producto.ID_ARTESANO === '' || producto.ID_ARTESANO === null  || producto.MATERIAL === '' || producto.MATERIAL === null || producto.CATEGORIA === '' || producto.CATEGORIA === null  || producto.DESCRIPCION === '' || producto.DESCRIPCION === null ) {
        alerta();
        } 
        else {
            if (editing) {
                await fetch(`http://localhost:4000/productos/${params.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(producto),
                });
            } else {
                await fetch("http://localhost:4000/productos/", {
                    method: "POST",
                    body: JSON.stringify(producto),
                    headers: { "Content-Type": "application/json" },
                });
            }
            navigate('/');
        }
        setLoading(false);
    };
    const handleChange = e => {
        setproducto({ ...producto, [e.target.name]: e.target.value });
    };

    const loadProducto = async (id) => {
        const res = await fetch(`http://localhost:4000/productos/${id}`);
        const data = await res.json();
        setproducto({ PRECIO: data.precio, ID_ARTESANO: data.id_artesano, MATERIAL: data.material, CATEGORIA: data.categoria, DESCRIPCION: data.descripcion })
        setEditing(true);
    };

    useEffect(() => {
        if (params.id) {
            loadProducto(params.id);
        }
    }, [params.id]);

    return (
        
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
        >

            <Grid item xs={3}>
                <Card
                    sx={{ mt: 5 }} style={{
                        backgroundColor: '#1e272e',
                        padding: '1rem'
                    }}
                >
                    <Typography variant='5' textAlign='center' color='white'>{editing ? "Edit Producto" : "Crear Producto"}</Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label="PRECIO"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="PRECIO"
                                value={producto.PRECIO}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="ID_ARTESANO"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="ID_ARTESANO"
                                value={producto.ID_ARTESANO}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="MATERIAL"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="MATERIAL"
                                value={producto.MATERIAL}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="CATEGORIA"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="CATEGORIA"
                                value={producto.CATEGORIA}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="DESCRIPCION"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                multiline
                                rows={4}
                                name="DESCRIPCION"
                                value={producto.DESCRIPCION}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />

                            <Button variant='contained' color='primary' type='submit'>
                                {loading ? <CircularProgress color='inherit' size={24} /> : 'Guardar'}
                            </Button>
                            <Button 
                            variant='contained' 
                            color='primary'
                            onClick={()=>navigate("/productos")}
                            style={{marginLeft:".5rem"}}>
                                Volver
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
