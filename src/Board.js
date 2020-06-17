import React, {useState} from "react";
import MyCard from "./CustomCard"
import {useToasts} from "react-toast-notifications";
import DepthFirstSearch from "./DepthFirstSearch";
import Button from "react-bootstrap/Button";
import Square from "./Square"
import createContainer from "./CreateContainer"
import BreathFirstSearch from "./BreathFirstSearch"
import Dijkstra from "./Dijkstra"
import axios from "axios"


const Board = (props) => {
    //can likely optimize blockedNodes
    let [cardMessages, setCardMessages] = useState([])
    let [backendOrFrontEnd, setBackEndOrFrontEnd] = useState([])
    const [blockedNodes, setBlockedNodes] = useState(Array(props.height * props.width).fill(false))
    let [squares, setSquares] = useState(Array(props.height * props.width).fill(false))
    let [weights, setWeights] = useState(Array(props.height * props.width).fill(1))
    const [startMarkerIndex, setStartMarkerIndex] = useState(-1)
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const [endMarkerIndex, setEndMarkerIndex] = useState(-1)
    const [clicked, setClicked] = useState(false)
    const [barrier, setBarrier] = useState(false)
    const {addToast} = useToasts()
    const [weightButton, setWeightButton] = useState(false)

    const updateMessages = (data, sender) =>
    {
        cardMessages.unshift(data)
        backendOrFrontEnd.unshift(sender)
        setCardMessages(cardMessages)
        setBackEndOrFrontEnd(backendOrFrontEnd)
    }
    const backendDepthFirstSearch = async () =>
    {
        const valid =checkForValidMarkers()
        if(valid!== null) {
            return valid
        }
        setClicked(true)
        updateMessages('Sending data for DFS', 'frontend')
        await axios.post('https://visualizerbackend.herokuapp.com/depthFirstSearch', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, blockedNodes})
            .then(res=>{
                updateMessages(res.data[0], 'backend')
                animateWithoutReturnPath(res.data[1])
            })
            .catch(err => {console.error(err)})
    }
    let backendBreathFirstSearch = async () => {
        const valid =checkForValidMarkers()
        if(valid!== null)
        {
            return valid
        }
        setClicked(true)
        updateMessages('Sending data for BFS', 'frontend')
        await axios.post('https://visualizerbackend.herokuapp.com/breathFirstSearch', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, HEIGHT, squares, blockedNodes, weights })
            .then(res=>{
                updateMessages(res.data[0], 'backend')
                animateWithReturnPath(res.data[1])
            })
            .catch(err => {console.error(err)})
        //const k = new BreathFirstSearch()
        //let dict = createContainer(SIZE, WIDTH, blockedNodes)
        //let shortestPath = k.BFS(startMarkerIndex, endMarkerIndex, dict, SIZE)
        //animateWithReturnPath(shortestPath)
    }
    let backendDijkstra = async () =>
    {
        const valid = checkForValidMarkers()
        if(valid !== null)
        {
            return valid
        }
        setClicked(true)
        updateMessages('Sending data for Dijkstra', 'frontend')
        await axios.post('https://visualizerbackend.herokuapp.com/dijkstra', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, blockedNodes, weights })
            .then(res=>{
                updateMessages(res.data[0], 'backend')
                animateWithReturnPath(res.data[1])
            })
            .catch(err => {console.error(err)})
        //let dict = createContainer(SIZE, WIDTH, blockedNodes)
        //const k = new Dijkstra(weights, dict, startMarkerIndex, endMarkerIndex, SIZE)
        //let shortestPath = k.dijkstra()
        //animateWithReturnPath(shortestPath)
    }

    let animateWithoutReturnPath = (arr) => {
        clearSquares()
        reDrawBarrier()
        let tickIndex = 1
        let timerID2
        if (clicked === true)
            return

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
                clearTickInterval(timerID2)
                setClicked(false)
                if(tickArr[tickArr.length - 1] === false) {
                    return (
                        addToast("Path does not exist", {
                            appearance: 'warning',
                            autoDismiss: true,
                        }))
                }
                squares[tickArr[tickArr.length - 1]] = 'gold'
                setSquares(squares.slice())
                return (
                    addToast("Path does exist", {
                        placement: 'top-middle',
                        appearance: 'success',
                        autoDismiss: true,
                    }))
            }
        }
        timerID2 = setInterval(
            () => tick2(arr),
            10
        )
    }

    let animateWithReturnPath = (arr) => {
        const findPathArr = arr[0]
        const shortestPathArr = arr[1]
        clearSquares()
        reDrawBarrier()
        let tickIndex = 0
        let timerID2
        if (clicked === true) {
            return
        }
        const clearTickInterval = () => {
            clearInterval(timerID2)
        }
        let finishedAnimatingFindPath = false
        const tick2 = (findPathArr, shortestPathArr) => {
            if(!finishedAnimatingFindPath) {
                if (tickIndex < findPathArr.length) {
                    //mutating the array directly -- doesn't seem to update promptly otherwise
                    //console.log("this is tickIndex: " + tickIndex)
                    //console.log("this is findPathArr[tickIndex]: " + findPathArr[tickIndex])
                    if(!(findPathArr[tickIndex] === endMarkerIndex))
                        squares[findPathArr[tickIndex]] = 'green'
                    tickIndex++
                    setSquares(squares.slice())
                } else {
                    finishedAnimatingFindPath = true
                    squares[endMarkerIndex] = 'gold'
                    setSquares(squares.slice())
                    tickIndex = 0
                }
            }
            else
            {
                if(tickIndex < shortestPathArr.length - 1)
                {
                    squares[shortestPathArr[tickIndex]] = 'gold'
                    setSquares(squares.slice())
                    tickIndex++
                }
                else{
                    squares[shortestPathArr[shortestPathArr.length - 1]] = 'gold'
                    setSquares(squares.slice())
                    clearTickInterval(timerID2)
                    setClicked(false)
                }
            }
        }
        timerID2 = setInterval(
            () => tick2(findPathArr, shortestPathArr),
            10
        )
    }

    const setWeight = (count) => {
        weights[count] = weights[count]+1
        setWeights(weights.slice())
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
    let dijkstra = () =>
    {
        const valid = checkForValidMarkers()
        if(valid !== null)
        {
            return valid
        }
        setClicked(true)

        let dict = createContainer(SIZE, WIDTH, blockedNodes)
        const k = new Dijkstra(weights, dict, startMarkerIndex, endMarkerIndex, SIZE)
        let shortestPath = k.dijkstra()
        animateWithReturnPath(shortestPath)
    }
    let breathFirstSearch = () => {
        const valid =checkForValidMarkers()
        if(valid!== null)
        {
            return valid
        }
        setClicked(true)
        const k = new BreathFirstSearch()
        let dict = createContainer(SIZE, WIDTH, blockedNodes)
        let shortestPath = k.BFS(startMarkerIndex, endMarkerIndex, dict, SIZE)
        animateWithReturnPath(shortestPath)
    }
    let depthFirstSearch = (SIZE, HEIGHT, WIDTH) => {
        const valid =checkForValidMarkers()
        if(valid!== null) {
            return valid
        }
        setClicked(true)
        const k = new DepthFirstSearch()
        let dict = createContainer(SIZE, WIDTH, blockedNodes)
        let shortestPath = k.DFS(startMarkerIndex, endMarkerIndex, dict, SIZE)
        animateWithoutReturnPath(shortestPath)
    }
    let renderSquare = (count) => {
        let state = 'slateGrey'
        if (squares[count] === 'gold' || squares[count] === 'green' || squares[count] === 'black')
            state = squares[count]
        else if (count === startMarkerIndex)
            state = 'startMarker'
        else if (count === endMarkerIndex)
            state = 'endMarker'
        return (<Square id={state} index={count} weight = {weights[count]} onClick={fork.bind(this, count)} key={count}/>)
    }
    let fork = (i) => {
        if(weightButton)
            setWeight(i)
        else
            SetMarker(i)
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
                appearance: 'info',
                autoDismiss: true,
            }))
    }

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
    const clearWeights = () => {
        setWeights(Array(props.height * props.width).fill(1))
    }
    const clearGraph = () => {
        clearSquares()
        clearBarrier()
        clearMarkers()
        clearWeights()
    }
    const createBarrier = () => {
        setBarrier(!barrier)
        if(weightButton)
        {
            setWeightButtonFunction()
        }
        if (barrier)
            document.getElementById("barrier").innerText = "Draw Barrier"
        else
            document.getElementById("barrier").innerText = "Disable Barrier"
    }

    const setWeightButtonFunction = () =>
    {
        setWeightButton(!weightButton)
        if(barrier)
        {
            createBarrier()
        }
        if(weightButton)
            document.getElementById("addWeights").innerText = "Set Weights"
        else
            document.getElementById("addWeights").innerText = "Toggle Weights Off"

    }
    const clearCardMessages = () =>
    {
        setCardMessages([])
        setBackEndOrFrontEnd([])
    }




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
    return (
        <div id={"box"}>
            <div id={"leftBox"}>
                    <div id = "buttons" className = "btn-group-vertical" role={"group"}>
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button"  onClick = {toggleOpen.bind(this)} className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded="false">
                            Algorithms
                        </button>
                        <div className={menuClass} aria-labelledby="btnGroupDrop1">
                            <a id={"menuButton"} className = "btn btn-primary-dropdown-item" onClick = {depthFirstSearch.bind(this, SIZE, WIDTH, HEIGHT)} >
                                Depth First Search
                                <p> (Does path Exist)</p>
                          </a>
                            <a id={"menuButton"} className = "btn btn-primary-dropdown-item" onClick = {breathFirstSearch.bind(this, SIZE, WIDTH, HEIGHT)} >
                                Breath-First Search
                                <p>(Shortest Path)</p>
                            </a>
                            <a id={"menuButton"} className = "btn btn-primary-dropdown-item" onClick = {dijkstra.bind(this, SIZE, WIDTH, HEIGHT)} >
                                Dijkstra's SPF
                            </a>
                        </div>
                    </div>
                    <Button className = "btn btn-primary-controlButton" onClick = {clearGraph.bind(this)}>Clear Graph</Button>
                    <Button className = "btn btn-primary-controlButton"  id = "barrier" onClick = { createBarrier.bind(this)}>Draw Barrier</Button>
                    <Button className = "btn btn-primary-controlButton" id ="addWeights" onClick = { setWeightButtonFunction.bind(this) }>Set Weights</Button>
                        <Button className = "btn btn-primary-controlButton" id ="addWeights" onClick = { backendDepthFirstSearch.bind(this) }>Backend DFS</Button>
                        <Button className = "btn btn-primary-controlButton" id ="addWeights" onClick = { backendBreathFirstSearch.bind(this) }>Backend BFS</Button>
                        <Button className = "btn btn-primary-controlButton" id ="addWeights" onClick = { backendDijkstra.bind(this) }>Backend Dijkstra</Button>
                    </div>
            </div>
        <div id={"centerBox"}>
         {parent}
        </div>
            <div id={"rightBox"}>
                  <MyCard clearMessages = {clearCardMessages.bind(this)} messages = {cardMessages} header = {backendOrFrontEnd} />
            </div>



        </div>
    );
}

export default Board


