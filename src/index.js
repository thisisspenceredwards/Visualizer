import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css'

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
            id: 'isBackgroundRed',
            hover: true
        })
    }
    onMouseLeaveSquare() {
        this.setState({
            id: '',
            hover: false})
    }
    render() {
        let idState = ''
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
            exitFinished: true,
            startMarkerIndex : -1,
            endMarkerIndex: -1
        }
        this.setMarker = this.setMarker.bind(this)
    }
    renderSquare(count) {
        let state = ''
        if(count === this.state.startMarkerIndex)
        {
            state = 'startMarker'
        }
        else if(count === this.state.endMarkerIndex)
        {
            state = 'endMarker'
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
        console.log("this is i: ", i)
        console.log()
        console.log("startMarkerIndex: " + startStateMarker)
        console.log("endMarkerIndex: " + endStateMarker)
    }
    render() {
        let parent = []
        let count = 0
        for(let i =0; i < 10; i++)
        {
            let children = []
            for(let j = 0; j < 10; j++)
            {
                children.push(this.renderSquare(count))
                count++
            }
            parent.push(<div key = {i}  className={"board-row"}>{children}</div>)
        }

        return (
            <div>
                {parent}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}
// ========================================

ReactDOM.render(

    <Game />,
    document.getElementById('root')
);
