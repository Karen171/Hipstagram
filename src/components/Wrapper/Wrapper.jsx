import React from 'react';
import  './style.scss';

const Wrapper = ({children}) => {
    return (
        <main className="wrapper">
            <section className="container">
                {children}
            </section>    
        </main>
    );
}

export default Wrapper;