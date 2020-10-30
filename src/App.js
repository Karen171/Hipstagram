import React from 'react';
import Application from './containers/Application/Application';
import Layout from './containers/Layout/index.js';
import './App.css';



function App() {
  return (
      <Layout>
        <Application/>
      </Layout>
  );
}

export default App;