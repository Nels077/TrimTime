import ReactDOM from 'react-dom';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {store} from './toolkitRedux';
import {Provider} from 'react-redux';
import App from './App';
import Page404 from './components/Page404/page404';
import Barbershop from './components/Barbershop/Barbershop';
import UserRegister from './components/form/register/UserRegister';
import Login from './components/form/login/Login';
import Contact from './components/contactUs/ContatUs';
import AboutUs from './components/aboutUs/AboutUs';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/barbershop/:id',
        element: <Barbershop/>,
    },
    {
        path: '/user-register',
        element: <UserRegister/>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/contact',
        element: <Contact/>,
    },
    {
        path: '/aboutUs',
        element: <AboutUs/>,
    },
    {
        path: '*',
        element: <Page404/>,
    },
]);

// Render the app with the router and Redux provider
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
