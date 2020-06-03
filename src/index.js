import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'
import DepthFirstSearch from './DepthFirstSearch.js'
class Square extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id: '',
            hover: false
        }
        this.onMouseEnterSquare = this.onMouseEnterSquare.bind(this)
        this.onMouseLeaveSquare = this.onMouseLeaveSquare.bind(this)
    }
    onMouseEnterSquare() {
        this.setState({
            id: 'redBackground',
            hover: true
        })
    }
    onMouseLeaveSquare() {
        this.setState({
            id: 'blueBackground',
            hover: false})
    }
    render() {
        let idState
        if(this.state.hover)
            idState = this.state.id
        else
            idState = this.props.id
        return (
            <Button
                className="square"
                id = {idState}
                onMouseEnter = {this.onMouseEnterSquare.bind()}
                onMouseLeave = {this.onMouseLeaveSquare.bind()}
                onClick = {this.props.onClick}>
            </Button>)
    }
}

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
            index : 0
        }
        this.setMarker = this.setMarker.bind(this)
        this.animateAdjacentNodes = this.animateAdjacentNodes.bind(this)
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
        this.timerID = setInterval(
            () => this.tick(),
            75
        )
        const k = new DepthFirstSearch()
        let dictionary = k.createContainer(SIZE, WIDTH, HEIGHT)
        this.setState({dictionary: dictionary})
        console.log(dictionary)
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
                iter: squares
            })
            clearInterval(this.timerID)
        }
    }
    render() {
        let parent = []
        let count = 0
        const HEIGHT = 10
        const WIDTH = 10
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
            </div>
        );
    }
}

class Game extends React.Component {


    render() {
        return (
            <div id ="body" className="game">
                <div className="game-board">
                    <Board/>
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
