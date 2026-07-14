import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="app-layout">
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido-principal" className="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
