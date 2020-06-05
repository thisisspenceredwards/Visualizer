import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import Board from './Board.js'
import {ToastProvider} from "react-toast-notifications";

class Game extends React.Component {
    constructor(props)
    {
        super(props)
        this.state =({
            height : 5,
            width : 5,
        })
    }
    render() {
        return (
            <ToastProvider autoDismissTimeout={2000} placement="bottom-center">
            <div id ="body" className="game">
                <div className="game-board">
                    <Board height = {this.state.height} width = {this.state.width}/>
                </div>
                <div className="game-info">
                </div>
            </div>
            </ToastProvider>
        );
    }
}

ReactDOM.render(
    <Game />,


    document.getElementById('root')
);


