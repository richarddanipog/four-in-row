import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/home-page.css';

class HomePage extends Component {
    render() {
        return (
            <div className={'home-page'}>
                <div>
                    <h1>Welcome to Connect Four</h1>   
                </div>
                <Link to={'/game-mode'} className={'start position-absolute'}>
                        Start Game
                </Link>
            </div>
        );
    }
}

export default HomePage;