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


/*
class Board extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            squares: Array(100).fill(undefined),
            iterSquares: Array(100).fill(undefined),
            dictionary: undefined,
            exitFinished: true,
            startMarkerIndex : -1,
            endMarkerIndex: -1,
            index : 0,
            clicked : false
        }
        this.setMarker = this.setMarker.bind(this)
        this.animateAdjacentNodes = this.animateAdjacentNodes.bind(this)
        this.depthFirstSearch = this.depthFirstSearch.bind(this)
    }
    depthFirstSearch(SIZE, HEIGHT, WIDTH){
        const k = new DepthFirstSearch()
        let dictionary = k.createContainer(SIZE, WIDTH, HEIGHT)
        this.setState({dictionary: dictionary})
        console.log(dictionary)

        let shortestPath = k.DFS(this.state.startMarkerIndex, this.state.endMarkerIndex, dictionary, SIZE)
        console.log(shortestPath)

    }
    renderSquare(count) {
        let state = 'slateGrey'
        let squares = this.state.iter
        if(count === this.state.startMarkerIndex)
        {
            state = 'startMarker'
        }
        else if(count === this.state.endMarkerIndex)
        {
            state = 'endMarker'
        }
        else if(squares !== undefined)
        {
            if(squares[count] === 'A') {
                state = 'green'
            }
            else if(squares[count] === 'B')
            {
                state = 'maroon'
            }
        }
        return (<Square id = {state} onClick = {this.setMarker.bind(this, count)} key = {count}/>)
    }
    setMarker(i)
    {

        let arr = this.state.squares.slice()
        let startStateMarker = this.state.startMarkerIndex;
        let endStateMarker = this.state.endMarkerIndex;
        if(startStateMarker === i)
        {
            startStateMarker = -1
            arr[i] = undefined

        }
        else if(startStateMarker < 0 && endStateMarker === i) {
            endStateMarker = -1
            arr[i] = undefined
        }
        else if(startStateMarker < 0)
        {
            startStateMarker = i
            arr[i] = 'O'
        }
        else if(endStateMarker === i) {
            endStateMarker = -1
            arr[i] = undefined
        }
        else if(endStateMarker < 0) {
            endStateMarker = i
            arr[i] = 'X'
        }
        this.setState({
           startMarkerIndex: startStateMarker,
            endMarkerIndex: endStateMarker,
            squares: arr
        })

    }
    animateAdjacentNodes(SIZE, WIDTH, HEIGHT)
    {
        if(this.state.clicked === false) {
            this.setState({
                clicked: true
            })
            this.timerID = setInterval(
                () => this.tick(),
                75
            )
            const k = new DepthFirstSearch()
            let dictionary = k.createContainer(SIZE, WIDTH, HEIGHT)
            this.setState({dictionary: dictionary})
            console.log(dictionary)
        }
    }
    tick(){
        let dictionary = this.state.dictionary
        let squares = this.state.squares.slice()
        let index = this.state.index
        if(dictionary !== undefined && index < Object.keys(dictionary).length){
            for (let i = 0; i < dictionary[index].length; i++) {
                console.log(index)
                squares[dictionary[index][i]] = 'A'
                squares[index] = 'B'
            }
            this.setState({
                index: index + 1,
                iter: squares
            })
        }
        else if(dictionary !== undefined && index === Object.keys(dictionary).length)
        {
            this.setState({
                index: 0,
                iter: squares,
                clicked: false
            })
            clearInterval(this.timerID)
        }
    }
    render() {
        let parent = []
        let count = 0
        const HEIGHT = this.props.height
        const WIDTH = this.props.width
        const SIZE = HEIGHT * WIDTH
        for(let i =0; i < HEIGHT; i++)
        {
            let children = []
            for(let j = 0; j < WIDTH; j++)
            {
                children.push(this.renderSquare(count))
                count++
            }
            parent.push(<div key = {i}  className={"board-row"}>{children}</div>)
        }
        return (
            <div>
                {parent}
                <Button onClick = {this.animateAdjacentNodes.bind(this, SIZE, WIDTH, HEIGHT)} > click me!</Button>
                <Button onClick = {this.depthFirstSearch.bind(this, SIZE, WIDTH, HEIGHT)} >DFS</Button>
                <Button onClick = {ToastDemo}> hi </Button>
            </div>
        );
    }
}
*/