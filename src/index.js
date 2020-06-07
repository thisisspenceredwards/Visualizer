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
            height : 20,
            width : 20,
        })
    }
    render() {
        return (

            <div id ="body" className="game">

                <div className="game-board">
                    <ToastProvider autoDismissTimeout={2000} placement="bottom-center">
                        <Board height = {this.state.height} width = {this.state.width}/>
                    </ToastProvider>
                </div>

                <div className="game-info">
                </div>
            </div>

        );
    }
}

ReactDOM.render(
    <Game />,


    document.getElementById('root')
);


