import React, {useEffect, useState} from "react";
import {useToasts} from "react-toast-notifications";
import DepthFirstSearch from "./DepthFirstSearch";
import Button from "react-bootstrap/Button";
import Square from "./Square"
import createContainer from "./CreateContainer"
import BreathFirstSearch from "./BreathFirstSearch"


const Board = (props) => {
    //can likely optimize blockedNodes
    const [blockedNodes, setBlockedNodes] = useState(Array(props.height * props.width).fill(false))
    let [squares, setSquares] = useState(Array(props.height * props.width).fill(false))
    const [startMarkerIndex, setStartMarkerIndex] = useState(-1)
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const [endMarkerIndex, setEndMarkerIndex] = useState(-1)
    const [clicked, setClicked] = useState(false)
    const [barrier, setBarrier] = useState(false)
    const {addToast} = useToasts()
    let animate = (arr) => {
        clearSquares()
        reDrawBarrier()
        let tickIndex = 1
        let timerID2
        if (clicked === true) {
            return
        }
        const clearTickInterval = () => {
            clearInterval(timerID2)
        }
        const tick2 = (tickArr) => {
            if (tickIndex < tickArr.length - 1) {
                //mutating the array directly :/
                squares[tickArr[tickIndex]] = 'green'
                tickIndex++
                setSquares(squares.slice())
            } else {
                squares[tickArr[tickArr.length - 1]] = 'gold'
                setSquares(squares.slice())
                clearTickInterval(timerID2)
                setClicked(false)
            }
        }
        timerID2 = setInterval(
            () => tick2(arr),
            10
        )
    }
    const checkForValidMarkers = () => {
        if (startMarkerIndex < 0 && endMarkerIndex < 0) {
            return (
                addToast("Please select a starting and ending location first", {
                    appearance: 'warning',
                    autoDismiss: true,
                }))
        } else return null
    }
    let breathFirstSearch = (SIZE, HEIGHT, WIDTH) => {
        const valid =checkForValidMarkers()
        if(valid!== null)
        {
            return valid
        }
        setClicked(true)
        const k = new BreathFirstSearch()
        let dict = createContainer(SIZE, WIDTH, blockedNodes)
        let shortestPath = k.BFS(startMarkerIndex, endMarkerIndex, dict, SIZE)
        animate(shortestPath)
    }
    let depthFirstSearch = (SIZE, HEIGHT, WIDTH) => {
        const valid =checkForValidMarkers()
        if(valid!== null)
        {
            return valid
        }
        setClicked(true)
        const k = new DepthFirstSearch()
        let dict = createContainer(SIZE, WIDTH, blockedNodes)
        let shortestPath = k.DFS(startMarkerIndex, endMarkerIndex, dict, SIZE)
        animate(shortestPath)
    }
    let renderSquare = (count) => {

        let state = 'slateGrey'
        if (squares[count] === 'gold' || squares[count] === 'green' || squares[count] === 'black')
            state = squares[count]
        else if (count === startMarkerIndex)
            state = 'startMarker'
        else if (count === endMarkerIndex)
            state = 'endMarker'
        return (<Square id={state} index={count} onClick={SetMarker.bind(this, count)} key={count}/>)
    }
    let SetMarker = (i) => {
        let toastMessage = ""
        let arr = squares.slice()
        let startStateMarker = startMarkerIndex;
        let endStateMarker = endMarkerIndex;
        if (barrier) {
            blockedNodes[i] = true
            setBlockedNodes(blockedNodes.slice())
            squares[i] = 'black'
            setSquares(squares.slice())
            console.log("boards: " + blockedNodes)
            return
        } else if (startStateMarker === i) {
            startStateMarker = -1
            arr[i] = undefined
            toastMessage = "Deselected Start Location"
        } else if (startStateMarker < 0 && endStateMarker === i) {
            endStateMarker = -1
            //arr[i] = undefined
            toastMessage = "Deselected End Location"
        } else if (startStateMarker < 0) {
            startStateMarker = i
            //arr[i] = 'O'
            toastMessage = "Start Location Selected"
        } else if (endStateMarker === i) {
            endStateMarker = -1
            //arr[i] = undefined
            toastMessage = "Deselected End Location"
        } else if (endStateMarker < 0) {
            endStateMarker = i
            //arr[i] = 'X'
            toastMessage = "Selected End Location"
        } else {
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

/*
    const animateAdjacentNodes = (SIZE, WIDTH, HEIGHT) => {
        let tickIndex = 0
        let timerID
        if (clicked === true) {
            return
        }
        const clearTickInterval = () => {
            clearInterval(timerID)
        }
        const tick = (tickDictionary) => {
            let tickSquares = squares.slice()
            if (tickDictionary !== undefined && tickIndex < Object.keys(tickDictionary).length) {
                for (let i = 0; i < tickDictionary[tickIndex].length; i++) {
                    tickSquares[tickDictionary[tickIndex][i]] = 'A'
                }
                tickSquares[tickIndex] = 'B'
                tickIndex++
                setSquares(tickSquares)
            } else if (tickIndex === Object.keys(tickDictionary).length) {
                setSquares(tickSquares)
                setClicked(false)
                clearTickInterval()
            } else {
                clearTickInterval()
            }
        }
        const k = new DepthFirstSearch()
        let dict = createContainer(SIZE, WIDTH, HEIGHT)
        setClicked(true)
        timerID = setInterval(
            () => tick(dict),
            1000
        )
    }
    */
    const clearSquares = () => {
        //squares not changing without setting squares explicitly
        squares = Array(props.height * props.width).fill(null)
        setSquares(Array(props.height * props.width).fill(null))

    }
    const reDrawBarrier = () =>{
        for(let i = 0; i < squares.length; i++)
        {
            if(blockedNodes[i] === true)
            {
                squares[i] = 'black'
            }
        }
        setSquares(Array(squares.slice()))
    }
    const clearBarrier = () => {
        setBlockedNodes(Array(props.height * props.width).fill(false))
    }
    const clearMarkers = () => {
        setStartMarkerIndex(-1)
        setEndMarkerIndex(-1)
    }
    const clearGraph = () => {
        clearSquares()
        clearBarrier()
        clearMarkers()
    }
    const createBarrier = () => {
        setBarrier(!barrier)
        if (barrier)
            document.getElementById("barrier").innerText = "Draw Barrier"
        else
            document.getElementById("barrier").innerText = "Disable Barrier"
    }
    /* const OnUpdate = (startMarkerIndex) =>
     {
         useEffect(() =>
         {
             let hell  = parent[1]
             console.log(hell)
         })
     }*/


    /*const OnMount = () => {
        useEffect(() => {
            let parent = []
            let count = 0
            for (let i = 0; i < HEIGHT; i++) {
                let children = []
                for (let j = 0; j < WIDTH; j++) {
                    children.push(renderSquare(count))
                    count++
                }
                parent.push(<div key={i} className={"board-row"}>{children}</div>)
            }
            setParent(parent)
        }, [])

    }
    OnMount()*/
    //OnUpdate(startMarkerIndex)
    let parent = []
    let count = 0
    const HEIGHT = props.height
    const WIDTH = props.width
    const SIZE = HEIGHT * WIDTH
    for (let i = 0; i < HEIGHT; i++) {
        let children = []
        for (let j = 0; j < WIDTH; j++) {
            children.push(renderSquare(count))
            count++
        }
        parent.push(<div key={i} className={"board-row"}>{children}</div>)
    }
    const toggleOpen = () => setDropDownMenu(!dropDownMenu)
    const menuClass = `dropdown-menu ${ dropDownMenu? " show": ""}`
    console.log("re rendering)")
    return (
        <div id={"box"}>
            <div id={"rightBox"}>
                <div className = "btn-group-vertical" role={"group"}>
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button"  onClick = {toggleOpen.bind(this)} className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded="false">
                            Algorithms
                        </button>
                        <div className={menuClass} aria-labelledby="btnGroupDrop1">
                            <a className = "btn btn-primary-dropdown-item" onClick = {depthFirstSearch.bind(this, SIZE, WIDTH, HEIGHT)} >Depth First Search</a>
                            <a className = "btn btn-primary-dropdown-item" onClick = {breathFirstSearch.bind(this, SIZE, WIDTH, HEIGHT)} >Breath-First Search</a>
                        </div>
                    </div>
                    <Button className = "controlButton" onClick = {clearGraph.bind(this)}>Clear Graph</Button>
                    <Button className = "controlButton"  id = "barrier" onClick = { createBarrier.bind(this)}>Draw Barrier</Button>
                </div>
            </div>
        <div id={"leftBox"}>
         {parent}
        </div>


        </div>
    );
}

export default Board