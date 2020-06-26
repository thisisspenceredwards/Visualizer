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
            //must be square
            heightAndWidth : 40,
        })
    }
    render() {
        return (

            <div id ="body" className="game">

                <div className="game-board">
                    <ToastProvider id = {"toasty"} autoDismissTimeout={2000} placement="bottom-center">
                        <Board id={"board"} heightAndWidth = {this.state.heightAndWidth}/>
                    </ToastProvider>
                </div>
            </div>

        );
    }
}

ReactDOM.render(
    <Game />,


    document.getElementById('root')
);


