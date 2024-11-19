import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = () => {
    const location = useLocation();
    const noHeaderFooterRoutes = [
        '/login',
        '/register',
        '/forgotPassword',
        '/successPage',
        '/passwordsuccess'
    ];

    const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

    return (
        <div>
            {shouldRenderHeaderFooter && <Header />}
            <Outlet />
            {shouldRenderHeaderFooter && <Footer />}
        </div>
    );
};

export default Layout;
