import React, {useState} from "react";
import {useToasts} from "react-toast-notifications";
import DepthFirstSearch from "./DepthFirstSearch";
import Button from "react-bootstrap/Button";
import Square from "./Square"
const Board = (props) => {
    const [squares, setSquares] = useState(Array(props.height * props.width).fill(null))
    const [startMarkerIndex, setStartMarkerIndex] = useState(-1)
    const [endMarkerIndex, setEndMarkerIndex] = useState(-1)
    const [clicked, setClicked] = useState(false)
    const { addToast } = useToasts()
    let animate = (arr) =>
    {
        console.log("ANIMATE CALLED")
        let tickIndex = 0
        let timerID2
        if(clicked === true)
        {
            return
        }
        const clearTickInterval = () => {
            clearInterval(timerID2)
        }
        const tick2 = (tickArr) => {
            console.log(tickArr)
            let tickSquares = squares.slice()
            //console.log(tickIndex)
            if(tickIndex < tickArr.length){
                for(let i = 0; i <= tickIndex; i++)
                {
                    console.log(tickArr[i])
                    tickSquares[tickArr[i]] = 'D'
                }
                tickIndex++
                setSquares(tickSquares)
            }
            else
            {
                //tickSquares[tickArr[tickArr.length]] = 'D'
                console.log("END")
                setSquares(tickSquares)
                //setIterSquares(squares)
                setClicked(false)
                clearTickInterval()
            }
        }
        timerID2 = setInterval (
            () => tick2(arr),
            250
        )
    }
    let depthFirstSearch = (SIZE, HEIGHT, WIDTH) =>
    {
        setClicked(true)
        const k = new DepthFirstSearch()
        let dict = k.createContainer(SIZE, WIDTH)
        let shortestPath = k.DFS(startMarkerIndex, endMarkerIndex, dict, SIZE)
        animate(shortestPath)
        //console.log(shortestPath)
    }
    let renderSquare = (count) => {
        //console.log("renderSquare")
        let state = 'slateGrey'

        //console.log(squares[count] + " index: " + count)
        if(squares[count] === 'D')
        {
            state = 'green'
        }
        else if(squares[count] === 'Z')
        {
            state = 'maroon'
        }
        else if(count === startMarkerIndex)
        {
            state = 'startMarker'
        }
        else if(count === endMarkerIndex)
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
                console.log("MARROOOON")
                state = 'maroon'
            }
        }
        return (<Square id = {state} onClick = {SetMarker.bind(this, count)} key = {count}/>)
    }
    let SetMarker = (i) => {
        let toastMessage = ""
        let arr = squares.slice()
        let startStateMarker = startMarkerIndex;
        let endStateMarker = endMarkerIndex;
        if(startStateMarker === i)
        {
            startStateMarker = -1
            arr[i] = undefined
            toastMessage = "Deselected Start Location"
        }
        else if(startStateMarker < 0 && endStateMarker === i) {
            endStateMarker = -1
            arr[i] = undefined
            toastMessage = "Deselected End Location"
        }
        else if(startStateMarker < 0)
        {
            startStateMarker = i
            arr[i] = 'O'
            toastMessage = "Start Location Selected"
        }
        else if(endStateMarker === i) {
            endStateMarker = -1
            arr[i] = undefined
            toastMessage = "Deselected End Location"
        }
        else if(endStateMarker < 0) {
            endStateMarker = i
            arr[i] = 'X'
            toastMessage = "Selected End Location"
        }
        else
        {
            return
        }
        setStartMarkerIndex(startStateMarker)
        setEndMarkerIndex(endStateMarker)
        setSquares(squares)

        return (
                addToast(toastMessage, {
            appearance: 'success',
            autoDismiss: true,
        }))
    }


    const animateAdjacentNodes = (SIZE, WIDTH, HEIGHT) => {
        let tickIndex = 0
        let timerID
        if(clicked === true)
        {
            return
        }
        const clearTickInterval = () => {
            clearInterval(timerID)
        }
        const tick = (tickDictionary) => {
            let tickSquares = squares.slice()
            if(tickDictionary !== undefined && tickIndex < Object.keys(tickDictionary).length){
                for (let i = 0; i < tickDictionary[tickIndex].length; i++) {
                    tickSquares[tickDictionary[tickIndex][i]] = 'A'
                }
                tickSquares[tickIndex] = 'B'
                tickIndex++
                setSquares(tickSquares)
            }
            else if(tickIndex === Object.keys(tickDictionary).length)
            {
                setSquares(tickSquares)
                setClicked(false)
                clearTickInterval()
            }
            else
            {
                clearTickInterval()
            }
        }
        const k = new DepthFirstSearch()
        let dict = k.createContainer(SIZE, WIDTH, HEIGHT)
        setClicked(true)
        timerID = setInterval (
            () => tick(dict),
            75
        )
    }
    let parent = []
    let count = 0
    const HEIGHT = props.height
    const WIDTH = props.width
    const SIZE = HEIGHT * WIDTH
    for(let i =0; i < HEIGHT; i++)
    {
        let children = []
        for(let j = 0; j < WIDTH; j++)
        {
            children.push(renderSquare(count))
            count++
        }
        parent.push(<div key = {i}  className={"board-row"}>{children}</div>)
    }

    return (

        <div>
            {parent}

            <Button onClick = {animateAdjacentNodes.bind(this, SIZE, WIDTH, HEIGHT)} > click me!</Button>
            <Button onClick = {depthFirstSearch.bind(this, SIZE, WIDTH, HEIGHT)} >DFS</Button>



        </div>


    );
}


export default Board