import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Productosform from './components/Productosform';
import Productoslist from './components/Productoslist';
import Artesanoslist from './components/Artesanoslist';
import Artesanosform from './components/Artesanosform';
import Menu from './components/Navbar';
import {Container} from '@mui/material'

export default function App() {
  return (
    <BrowserRouter>
    <Menu/>
      <Container>
        <Routes>
          <Route path='/' element={<Artesanoslist/>}/>
          <Route path='/artesanos/:id/productos' element={<Productoslist/>}/>
          <Route path='/artesanos' element={<Artesanoslist/>}/>
          <Route path='/artesanos/new' element={<Artesanosform/>}/>
          <Route path='/artesanos/:id/edit' element={<Artesanosform/>}/>
          <Route path='/productos' element={<Productoslist/>}/>
          <Route path='/productos/new' element={<Productosform/>}/>
          <Route path='/productos/:id/edit' element={<Productosform/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
