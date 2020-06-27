import React, {useState} from "react";
import MyCard from "./CustomCard"
import {useToasts} from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Square from "./Square"
import axios from "axios"


const Board = (props) => {
    const testingUrl = "https://visualizerbackend.herokuapp.com/"
    //const testingUrl = "http://localhost:9000/"
    //can likely optimize blockedNodes
    let [cardMessages, setCardMessages] = useState(["Note: If the server has been idle, the initial query may take up to 10 seconds to complete.",
                                                            "Backend is hosted at: https://visualizerbackend.herokuapp.com/",
                                                            "To use:  Click a square to set a start location",
                                                                "Then click another square to select a destination",
                                                                    "You may also set barriers to change the available paths",
                                                                        "For Dijkstra's SPF you can set the weight of each square " +
                                                                        "changing the algorithm's chosen path",
                                                                        "As a note: The path found may not be the 'straightest' path as diagonal moves are valid," +
                                                                        "but if you count the squares it will be equal to a more intuitive path"])
    const HEIGHT = props.heightAndWidth
    const WIDTH = props.heightAndWidth
    const SIZE = props.heightAndWidth * props.heightAndWidth
    const [loading, setLoading] = useState(false)
    let [backendOrFrontEnd, setBackEndOrFrontEnd] = useState([])
    const [blockedNodes, setBlockedNodes] = useState(Array(SIZE).fill(false))
    let [squares, setSquares] = useState(Array(SIZE).fill('grey'))
    let [weights, setWeights] = useState(Array(SIZE).fill(1))
    const [startMarkerIndex, setStartMarkerIndex] = useState(-1)
    const [dropDownMenu, setDropDownMenu] = useState(Array(2).fill(false))
    const [endMarkerIndex, setEndMarkerIndex] = useState(-1)
    const [barrier, setBarrier] = useState(false)
    const {addToast} = useToasts()
    const [weightButton, setWeightButton] = useState(false)

    const updateMessages = (data, sender) =>
    {
        cardMessages.unshift(data)
        backendOrFrontEnd.unshift(sender)
        setCardMessages(cardMessages.slice())
        setBackEndOrFrontEnd(backendOrFrontEnd.slice())

    }
    const dialogToOutput = (date1, data) =>
    {
        setLoading(false)
        const date2 = new Date()
        const time = Math.abs(date2-date1)
        updateMessages(data, 'Backend'  )
        updateMessages('Query round trip time: ' +  time + " milliseconds", 'Frontend')
    }
    let backendDijkstra = async () =>
    {
        const date1 = new Date()
        const valid = checkForValidMarkers()
        if(valid !== null)
        {
            return valid
        }
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for Dijkstra', 'Frontend')
        await axios.post(testingUrl + 'dijkstra', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, blockedNodes, weights })
            .then(res=>{
                dialogToOutput(date1, res.data[0])
                if(!res.data[1] === false) {
                    animateWithReturnPath(res.data[1])
                }
                else
                    return (
                        addToast("Path does not exist", {
                            appearance: 'warning',
                            autoDismiss: true,
                        }))
            })
            .catch(err => {console.error(err)})
    }
    const backendDepthFirstSearch = async () =>
    {
        const date1 = new Date()
        const valid =checkForValidMarkers()
        if(valid!== null) {
            return valid
        }
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for DFS', 'Frontend')
        await axios.post(testingUrl + 'depthFirstSearch', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, blockedNodes})
            .then(res=>{
                dialogToOutput(date1, res.data[0])
                animateWithoutReturnPath(res.data[1])
            })
            .catch(err => {console.error(err)})
    }
    const messageSeparator = () =>
    {
        updateMessages(" ", " *************************  ")
    }
    let backendBreathFirstSearch = async () => {
        let date1 = new Date()
        const valid =checkForValidMarkers()
        if(valid!== null)
        {
            return valid
        }
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for BFS', 'Frontend')
        await axios.post(testingUrl + 'breathFirstSearch', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, HEIGHT, squares, blockedNodes, weights })
            .then(res=>{
                dialogToOutput(date1, res.data[0])
                if(!res.data[1] === false) {
                    animateWithReturnPath(res.data[1])
                }
                else
                    return (
                        addToast("Path does not exist", {
                            appearance: 'warning',
                            autoDismiss: true,
                        }))
            })
            .catch(err => {console.error(err)})
    }

    let animateWithoutReturnPath = (arr) => {

        let tickIndex = 1
        let timerID2
        resetRun()
        //reDrawBarrier()
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
                if(tickArr[tickArr.length - 1] === false) {
                    setSquares(squares.slice())
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
        let tickIndex = 0
        let timerID2
        resetRun()
        const clearTickInterval = () => {
            clearInterval(timerID2)
        }
        let finishedAnimatingFindPath = false
        const tick2 = (findPathArr, shortestPathArr) =>
        {
            if(!finishedAnimatingFindPath)
            {
                if (tickIndex <= findPathArr.length) {
                    for(let i = 0; i < 4; i++)
                    {
                        //mutating the array directly -- doesn't seem to update promptly otherwise
                        if (tickIndex <= findPathArr.length && findPathArr[tickIndex] !== endMarkerIndex && findPathArr[tickIndex] !== startMarkerIndex)
                        {
                            squares[findPathArr[tickIndex]] = 'green'
                        }
                        tickIndex++
                    }
                }
                else
                {
                    finishedAnimatingFindPath = true
                    squares[endMarkerIndex] = 'gold'
                    tickIndex = 0
                }
                setSquares(squares.slice())
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
                }
            }
        }
        timerID2 = setInterval(
            () => tick2(findPathArr, shortestPathArr),
            0
        )
    }

    const setWeight = (count) => {
        weights[count] = weights[count]+1
        setWeights(weights.slice())
    }

    const checkForValidMarkers = () => {
        if (startMarkerIndex < 0 || endMarkerIndex < 0) {
            return (
                addToast("Please select a starting and ending location first", {
                    appearance: 'warning',
                    autoDismiss: true,
                }))
        } else return null
    }

    let renderSquare = (count) => {
        return (<Square id={squares[count]} index={count} weight = {weights[count]} onClick={fork.bind(this, count)} key={count}/>)
    }
    let fork = (i) => {
        if(weightButton)
            setWeight(i)
        else
            SetMarker(i)
    }
    let SetMarker = (i) => {
        let toastMessage = ""
        let startStateMarker = startMarkerIndex;
        let endStateMarker = endMarkerIndex;
        if(blockedNodes[i]) //is already a blocked node.  Nothing to do with those
        {
            return
        }
        if (barrier) { //manually setting barrier
            blockedNodes[i] = true
            setBlockedNodes(blockedNodes.slice())
            squares[i] = 'black'
            setSquares(squares.slice())
            return
        } else if (startStateMarker === i) {
            squares[i] = 'grey'
            startStateMarker = -1
            //arr[i] = undefined
            toastMessage = "Deselected Start Location"
            resetRun()
           // clearAlgorithm()
           // resetRun()
        } else if (startStateMarker < 0 && endStateMarker === i) {
            endStateMarker = -1
            squares[i] = 'grey'
            resetRun()
            toastMessage = "Deselected End Location"
        } else if (startStateMarker < 0) {
            startStateMarker = i
            squares[i] = 'startMarker'
            toastMessage = "Start Location Selected"
        } else if (endStateMarker === i) {
            squares[i] = 'grey'
            endStateMarker = -1
            resetRun()
            toastMessage = "Deselected End Location"
        } else if (endStateMarker < 0) {
            endStateMarker = i
            squares[i] = 'endMarker'
            toastMessage = "Selected End Location"
        } else {
            return
        }
        setStartMarkerIndex(startStateMarker)
        setEndMarkerIndex(endStateMarker)
        squares[startStateMarker] = 'startMarker'
        squares[endStateMarker] = 'endMarker'
        setSquares(squares.slice())
        return (
            addToast(toastMessage, {
                appearance: 'info',
                autoDismiss: true,
            }))
    }

    const clearSquares = () => {
        //squares not changing without setting squares explicitly
        for(let i = 0; i < squares.length; i++) {
            squares = Array(SIZE).fill(null)
            setSquares(Array(SIZE).fill(null))
        }
    }
    const resetRun = () =>{
        for(let i = 0; i < squares.length; i++) {
            if (squares[i] === 'green' || squares[i] === 'gold') {
                squares[i] = 'grey'
            }
        }
        setSquares(squares.slice())
    }
    const clearBarrier = () => {
        setBlockedNodes(Array(SIZE).fill(false))
    }
    const clearMarkers = () => {
        setStartMarkerIndex(-1)
        setEndMarkerIndex(-1)
    }
    const clearWeights = () => {
        setWeights(Array(SIZE).fill(1))
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
    const randomizeWeights = async () =>
    {
        let date1 = new Date()
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for random weight generation', 'Frontend')
        await axios.post(testingUrl + 'weightGeneration', {SIZE})
            .then(res => {
                setLoading(false)
                dialogToOutput(date1, res.data[0])
                setWeights(res.data[1])
            })
    }
    const generateBacktrack = async () =>
    {
        let date1 = new Date()
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for maze generation', 'Frontend')
        await axios.post(testingUrl + 'generateBacktracking', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, HEIGHT, squares, blockedNodes, weights })
            .then(res=>{
                setLoading(false)
                dialogToOutput(date1, res.data[0])
                let arr = res.data[1]
                let tempBlockedNodes = Array(SIZE).fill(false)
                for(let i = 0; i < arr.length; i++)
                {
                    if(arr[i] === 'black')
                        tempBlockedNodes[i] = true
                }
                setBlockedNodes(tempBlockedNodes)
                setSquares(res.data[1])
            })
            .catch(err => {console.error(err)})
    }
    const generatePrimsTree = async () =>
    {
        let date1 = new Date()
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for maze generation', 'Frontend')
        await axios.post(testingUrl + 'primsTree', {startMarkerIndex, SIZE, WIDTH, blockedNodes, weights })
            .then(res=>{
                /*setLoading(false)
                dialogToOutput(date1, res.data[0])
                let arr = res.data[1]
                let tempBlockedNodes = Array(SIZE).fill(false)
                for(let i = 0; i < arr.length; i++)
                {
                    if(arr[i] === 'black')
                        tempBlockedNodes[i] = true
                }
                setBlockedNodes(tempBlockedNodes)
                setSquares(res.data[1])*/
            })
            .catch(err => {console.error(err)})
    }
    const generatePrimsMaze = async () =>
    {
        let date1 = new Date()
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for maze generation', 'Frontend')
        await axios.post(testingUrl + 'generatePrimsMaze', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, HEIGHT, squares, blockedNodes, weights })
            .then(res=>{
                setLoading(false)
                dialogToOutput(date1, res.data[0])
                let arr = res.data[1]
                let tempBlockedNodes = Array(SIZE).fill(false)
                for(let i = 0; i < arr.length; i++)
                {
                    if(arr[i] === 'black')
                        tempBlockedNodes[i] = true
                }
                setBlockedNodes(tempBlockedNodes)
                setSquares(res.data[1])
            })
            .catch(err => {console.error(err)})
    }
    const clearCardMessages = () =>
    {
        setCardMessages([])
        setBackEndOrFrontEnd([])
    }

    let parent = []
    let count = 0
    for (let i = 0; i < WIDTH; i++) {
        let children = []
        for (let j = 0; j < HEIGHT; j++) {
            children.push(renderSquare(count))
            count++
        }
        parent.push(<div key={i} className={"board-row"}>{children}</div>)
    }
    const toggleOpen = (i) =>
    {
        const temp = [false, false]
        temp[i] = !dropDownMenu[i]

        setDropDownMenu(temp)
    }
    const menuClass1 = `dropdown-menu ${ dropDownMenu[0]? " show": ""}`
    const menuClass2 = `dropdown-menu ${ dropDownMenu[1]? " show": ""}`
    return (
        <div id={"box"}>
            <div id={"leftBox"}>
                    <div id = "buttons1" className = "btn-group-vertical" role={"group"}>
                        <div className="btn-group" role="group">
                            <button id="btnGroupDrop" type="button"  onClick = {toggleOpen.bind(this, 0)} className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded="false">
                                Shortest Path Algorithms
                            </button>
                            <div className={menuClass1} aria-labelledby="btnGroupDrop1">
                                <a id={"menuButton"} className = "btn btn-primary-controlButton" onClick = { backendDepthFirstSearch.bind(this) }>
                                    Depth First Search
                                    <p> (Does path Exist)</p>
                                </a>
                                <a id={"menuButton"} className = "btn btn-primary-controlButton" onClick = { backendBreathFirstSearch.bind(this) }>
                                    Breath-First Search
                                    <p>(Shortest Path)</p>
                                </a>
                                <a id={"menuButton"} className = "btn btn-primary-controlButton" onClick = { backendDijkstra.bind(this) }>
                                    Dijkstra's SPF
                                </a>
                                <a id={"menuButton"} className = "btn btn-primary-controlButton1" onClick = { generatePrimsTree.bind(this) }>
                                    Prim's Minimum Spanning Tree
                                </a>
                            </div>
                        </div>
                        <div className="btn-group" role="group">
                            <button id="btnGroupDrop" type="button"  onClick = {toggleOpen.bind(this, 1)} className="btn btn-primary dropdown-toggle"
                                    data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded="false">
                                Maze Generation Algorithms
                            </button>
                            <div className={menuClass2} aria-labelledby="btnGroupDrop11">
                                <a id={"menuButton"} className = "btn btn-primary-controlButton1" onClick = { generatePrimsMaze.bind(this) }>
                                    Prim's Maze
                                </a>
                                <a id={"menuButton"} className = "btn btn-primary-controlButton1" onClick = { generateBacktrack.bind(this) }>
                                    Recursive Backtracking
                                </a>

                            </div>
                        </div>
                    <Button className = "btn btn-lg btn-primary-controlButton" onClick = {clearGraph.bind(this)}>Clear Graph</Button>
                    <Button className = "btn btn-lg btn-primary-controlButton"  id = "barrier" onClick = { createBarrier.bind(this)}>Draw Barrier</Button>
                    <Button className = "btn btn-lg btn-primary-controlButton" id ="addWeights" onClick = { setWeightButtonFunction.bind(this) }>Set Weights</Button>
                        <Button className = "btn btn-lg btn-primary-controlButton" id ="randomizeWeights" onClick = { randomizeWeights.bind(this)}>Randomize Weights</Button>
                    <Button className = "btn btn-lg btn-primary-controlButton" id = "randomizeWeights" onClick = { clearWeights.bind(this)}>Remove Weights</Button>
                    </div>
            </div>
            <div id={"centerBox"}>
                {parent}
                <div id={"rightBox"}>
                    <MyCard loading = {loading} clearMessages = {clearCardMessages.bind(this)} messages = {cardMessages} header = {backendOrFrontEnd} />

                </div>
            </div>


        </div>
    );
}

export default Board


/*

 */