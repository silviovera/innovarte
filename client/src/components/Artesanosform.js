import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography,  } from '@mui/material'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

export default function Artesanosform() {
    const [artesano, setartesano] = useState({
        RUT: '',
        CONTRASENA:'',
        NOMBRE: '',
        RUBRO: '',
        NUMERO_TELEFONO: '',
        DIRECCION:'',
        DESCRIPCION:''
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
        if (artesano.RUT ==='' || artesano.RUT ===null || artesano.NOMBRE === '' || artesano.NOMBRE === null || artesano.RUBRO === '' || artesano.RUBRO === null  || artesano.NUMERO_TELEFONO === '' || artesano.NUMERO_TELEFONO === null|| artesano.DIRECCION ==='' || artesano.DIRECCION ===null || artesano.DESCRIPCION ==='' || artesano.DESCRIPCION ===null) {
        alerta();
        } 
        else {
            if (editing) {
                await fetch(`http://localhost:4000/artesanos/${params.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(artesano),
                });
            } else {
                await fetch("http://localhost:4000/artesanos/", {
                    method: "POST",
                    body: JSON.stringify(artesano),
                    headers: { "Content-Type": "application/json" },
                });
            }
            navigate('/');
        }
        setLoading(false);
    };
    const handleChange = e => {
        setartesano({ ...artesano, [e.target.name]: e.target.value });
    };

    const loadArtesano = async (id) => {
        const res = await fetch(`http://localhost:4000/artesanos/${id}`);
        const data = await res.json();
        setartesano({ RUT: data.rut, NOMBRE: data.nombre, CONTRASENA: data.contrasena, RUBRO: data.rubro, NUMERO_TELEFONO: data.numero_telefono, DIRECCION: data.direccion,DESCRIPCION: data.descripcion })
        setEditing(true);
    };

    useEffect(() => {
        if (params.id) {
            loadArtesano(params.id);
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
                    <Typography variant='5' textAlign='center' color='white'>{editing ? "Edit artesano" : "Crear artesano"}</Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label="RUT"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="RUT"
                                value={artesano.RUT}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="NOMBRE"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="NOMBRE"
                                value={artesano.NOMBRE}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="CONTRASENA"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="CONTRASENA"
                                value={artesano.CONTRASENA}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="RUBRO"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="RUBRO"
                                value={artesano.RUBRO}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label="NUMERO_TELEFONO"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="NUMERO_TELEFONO"
                                value={artesano.NUMERO_TELEFONO}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                                                        <TextField
                                variant='filled'
                                label="DIRECCION"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="DIRECCION"
                                value={artesano.DIRECCION}
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
                                value={artesano.DESCRIPCION}
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
                            onClick={()=>navigate("/artesanos")}
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
