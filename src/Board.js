import React, {useState} from "react";
import MyCard from "./CustomCard"
import {useToasts} from "react-toast-notifications";
import Button from "react-bootstrap/Button";
import Square from "./Square"
import axios from "axios"


const Board = (props) => {
    //const testingUrl = "https://visualizerbackend.herokuapp.com/"
    const testingUrl = "http://localhost:9000/"
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
    const [loading, setLoading] = useState(false)
    let [backendOrFrontEnd, setBackEndOrFrontEnd] = useState([])
    const [blockedNodes, setBlockedNodes] = useState(Array(props.height * props.width).fill(false))
    let [squares, setSquares] = useState(Array(props.height * props.width).fill(false))
    let [weights, setWeights] = useState(Array(props.height * props.width).fill(1))
    const [startMarkerIndex, setStartMarkerIndex] = useState(-1)
    const [dropDownMenu, setDropDownMenu] = useState(false)
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
        clearSquares()
        reDrawBarrier()
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
        clearSquares()
        reDrawBarrier()
        const clearTickInterval = () => {
            clearInterval(timerID2)
        }
        let finishedAnimatingFindPath = false
        const tick2 = (findPathArr, shortestPathArr) => {
            if(!finishedAnimatingFindPath)
            {
                for(let i = 0; i < 2; i++)
                {
                if (tickIndex < findPathArr.length) {
                    //mutating the array directly -- doesn't seem to update promptly otherwise
                    if(!(findPathArr[tickIndex] === endMarkerIndex) && !(findPathArr[tickIndex] === startMarkerIndex))
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
    const generateMaze = async () =>
    {
        let date1 = new Date()
        setLoading(true)
        messageSeparator()
        updateMessages('Sending data for maze generation', 'Frontend')
        await axios.post(testingUrl + 'generateMaze', {startMarkerIndex, endMarkerIndex, SIZE, WIDTH, HEIGHT, squares, blockedNodes, weights })
            .then(res=>{
                setLoading(false)
                dialogToOutput(date1, res.data[0])
                let arr = res.data[1]
                let tempBlockedNodes = Array(props.height * props.width).fill(false)
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
                    <div id = "buttons1" className = "btn-group-vertical" role={"group"}>
                        <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button"  onClick = {toggleOpen.bind(this)} className="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded="false">
                            Algorithms
                        </button>
                        <div className={menuClass} aria-labelledby="btnGroupDrop1">
                            <a id={"menuButton"} className = "btn btn-primary-controlButton" onClick = { backendDepthFirstSearch.bind(this) }>Backend DFS>
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
                        </div>
                    </div>
                    <Button className = "btn btn-lg btn-primary-controlButton" onClick = {clearGraph.bind(this)}>Clear Graph</Button>
                    <Button className = "btn btn-lg btn-primary-controlButton"  id = "barrier" onClick = { createBarrier.bind(this)}>Draw Barrier</Button>
                    <Button className = "btn btn-lg btn-primary-controlButton" id ="addWeights" onClick = { setWeightButtonFunction.bind(this) }>Set Weights</Button>
                    <Button className = "btn btn-lg btn-primary-controlButton" id = "maze" onClick = { generateMaze.bind(this)}>Generate Maze</Button>
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


