import React, { Component } from 'react';
import MainComponent from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure } from './redux/configureStore';

const store = configure();
class App extends Component{
    
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div >
                        <MainComponent/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
        
 }

export default App;
