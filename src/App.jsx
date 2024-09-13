import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, ArrowLeftRight, Settings, CircleUser, Package, Building2, MapPin, Box ,Clipboard,Layers, User  } from "lucide-react";
import Sidebar, { SidebarItem, SidebarAccordion } from "./components/Sidebar";
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './configs/ProtectedRoute';
import { Navbar2 } from './components/Navbar';
import { AreasPage } from './pages/AreasPage';
import { SedeAreasPage } from './pages/SedeAreasPage';
import CentrosPage from './pages/CentrosPage';
import SedesPage from './pages/SedesPage';
import ProfileView from './pages/PerfilUserpage';
import MunicipioPage from './pages/MunicipioPage';
import FichaPage from './pages/FichaPage';
import ProgramaPage from './pages/ProgramasPage';
import Rol from './pages/RolPage';
import SitioPage from './pages/SitioPage';
import Tipo_Sitio from './pages/tipo_Sitio';

// Lazy load the pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ResiduosPage = lazy(() => import('./pages/ResiduosPage'));
const MovimientosPage = lazy(() => import('./pages/MovimientosPage'));
const ActividadesPage = lazy(() => import('./pages/ActividadesPage'));
const UsuariosPage = lazy(() => import('./pages/UsuariosPage'));
const ElementosPage = lazy(() => import('./pages/ElementosPage'));
const CategoriasPage = lazy(() => import('./pages/Categoriaspage')); // Corregido el nombre de la página

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home/" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/residuos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ResiduosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/movimientos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <MovimientosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/actividades" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ActividadesPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/usuarios" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <UsuariosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        
        <Route path="/areas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <AreasPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/sedeAreas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <SedeAreasPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/centros" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <CentrosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/sedes" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <SedesPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/elementos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ElementosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/categoria" element={ // Corregido el nombre del path
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <CategoriasPage /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ProfileView /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/Municipio" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <MunicipioPage /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
         <Route path="/Fichas" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <FichaPage /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/Programa" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <ProgramaPage /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/roles" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <Rol /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
         <Route path="/Sitios" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <SitioPage /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
         <Route path="/Tipo_Sitio" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <Tipo_Sitio /> {/* Corregido el nombre del componente */}
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
      </Routes>
      
    </BrowserRouter>
  );
};

const WithSidebar = ({ children }) => (
  <div className="flex">
    <Sidebar>
      <SidebarItem nav="/home" icon={<Home size={20} />} text="Home" />
      <SidebarItem nav="/movimientos" icon={<ArrowLeftRight size={20} />} text="Movimientos" />
      <SidebarItem nav="/areas" icon={<MapPin size={20} />} text="Areas" />
      <SidebarItem nav="/usuarios" icon={<CircleUser size={20} />} text="Usuarios" />

      <SidebarAccordion icon={<Settings size={20} />} text="Opciones">
        <SidebarItem nav="/sedeAreas" icon={<Building2 size={20} />} text="Sedes Areas" />
        <SidebarItem nav="/centros" icon={<MapPin size={20} />} text="Centros" />
        <SidebarItem nav="/sedes" icon={<Building2 size={20} />} text="Sedes" />
        <SidebarItem nav="/municipio" icon={<MapPin size={20} />} text="Municipio" />
        <SidebarItem nav="/fichas" icon={<Clipboard  size={20} />} text="Fichas" />
        <SidebarItem nav="/programa" icon={<Layers    size={20} />} text="Programa" />
        <SidebarItem nav="/roles" icon={<User size={20} />} text="Roles" />
        <SidebarItem nav="/sitios" icon={<MapPin size={20} />} text="Sitios" />
        <SidebarItem nav="/tipo_Sitio" icon={<MapPin size={20} />} text="Tipo Sitio" />
      </SidebarAccordion>
      <SidebarAccordion icon={<Box size={20} />} text="Bodega">
        <SidebarItem nav="/elementos" icon={<Package size={20} />} text="Elementos" />
        <SidebarItem nav="/categoria" icon={<Package size={20} />} text="Categoría" /> {/* Corregido el texto */}
      </SidebarAccordion>
    </Sidebar>
    <div className='w-full bg-white h-screen overflow-auto'>
      <Navbar2 />
      {children}
    </div>
  </div>
);
