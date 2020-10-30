import React from 'react';
import {Provider} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import store from '../../store/store'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Layout = ({children}) => {
    return (
        <Provider store={store}>
            <ToastContainer/>
            <Router>
                {children}
            </Router>
         </Provider>
    )
}

export default Layout
