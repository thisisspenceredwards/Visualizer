import React, {useState} from "react";
import MyCard from "./CustomCard"
import Menu from "./Menu"
import {useToasts} from "react-toast-notifications";
import Square from "./Square"
import axios from "axios"
import MessagesForCard from "./MessagesForCard"
import animateMethods from "./animateMethods"
import {queryBackendHigherOrderFunctionSPF, queryBackendHigherOrderFunctionMaze} from "./QueryBackend"


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

    const [barrier, setBarrier] = useState(false)
    const [weightButton, setWeightButton] = useState(false)
    const HEIGHT = props.heightAndWidth
    const WIDTH = props.heightAndWidth
    const SIZE = props.heightAndWidth * props.heightAndWidth
    const [loading, setLoading] = useState(false)
    let [backendOrFrontEnd, setBackEndOrFrontEnd] = useState([])
    const [blockedNodes, setBlockedNodes] = useState(Array(SIZE).fill(false))
    let [squares, setSquares] = useState(Array(SIZE).fill('grey'))
    let [weights, setWeights] = useState(Array(SIZE).fill(1))
    const [startMarkerIndex, setStartMarkerIndex] = useState(-1)
    const [endMarkerIndex, setEndMarkerIndex] = useState(-1)

    const {addToast} = useToasts()
    const messagesForCard = new MessagesForCard(cardMessages, backendOrFrontEnd, setCardMessages, setBackEndOrFrontEnd, setLoading)
    const animateMethod = new animateMethods(squares, setSquares, addToast)
   /********************************************/
    //Higher order function to make querying the backend more concise and easier
    const queryBackendSPF = queryBackendHigherOrderFunctionSPF(testingUrl, SIZE, WIDTH, messagesForCard.backendResponse, addToast)
    const queryBackendMaze = queryBackendHigherOrderFunctionMaze(testingUrl, SIZE, WIDTH, HEIGHT, messagesForCard.backendResponse, addToast, setBlockedNodes, setSquares)
   /******************************************/
    /* Methods for SPF algorithms */
    let backendDijkstra = () =>
    {
        if(checkForValidMarkers() === null) {
            messagesForCard.frontendInitialMessage('Sending data for Dijkstra')
            queryBackendSPF('dijkstra', startMarkerIndex, endMarkerIndex, blockedNodes, weights, animateMethod.animateWithReturnPath).then(r => console.log("hey"))
        }
    }
    const backendDepthFirstSearch = () =>
    {
        if(checkForValidMarkers() === null) {
            messagesForCard.frontendInitialMessage('Sending data for DFS')
            queryBackendSPF('depthFirstSearch', startMarkerIndex, endMarkerIndex, blockedNodes, weights, animateMethod.animateWithoutReturnPath).then(r => console.log("ok"))
        }
    }
    const backendBreathFirstSearch = () => {
        if(checkForValidMarkers() === null) {
            messagesForCard.frontendInitialMessage("Sending data for BFS")
            queryBackendSPF('breathFirstSearch', startMarkerIndex, endMarkerIndex, blockedNodes, weights, animateMethod.animateWithReturnPath).then(r => console.log("ok"))
        }
    }
    // MAZES
    const generateBacktrack = () => {
        messagesForCard.frontendInitialMessage('Sending data for Recursive Backtracking Maze Generation', false)
        queryBackendMaze('generateBacktracking', startMarkerIndex, endMarkerIndex, squares, blockedNodes, weights).then(r => console.log())
    }
    const generatePrimsMaze = async () =>
    {
        messagesForCard.frontendInitialMessage("Sending data for Prim's Maze Generation", false)
        queryBackendMaze('generatePrimsMaze', startMarkerIndex, endMarkerIndex, squares, blockedNodes, weights).then(r => console.log())
    }
    const setWeight = (count) => {
        weights[count] = weights[count]+1
        setWeights(weights.slice())
    }

    const checkForValidMarkers = () => {
        if((startMarkerIndex < 0 || endMarkerIndex < 0))
        {
            return (
                addToast("Please select a starting and ending location first", {
                    appearance: 'warning',
                    autoDismiss: true,
                }))
        }
        return null
    }
    const setStartAndEndLocations = (markerMethod, index, color, deselected) =>
    {
        const temp = squares.slice()
        if(deselected) {
            resetBoardOnDestinationChange(temp)
            markerMethod(-1)
        }
        else {
            markerMethod(index)
        }
        temp[index] = color
        setSquares(temp)
    }

    const setNodeToBlocked = (i) =>
    {
        blockedNodes[i] = true
        setBlockedNodes(blockedNodes.slice())
        squares[i] = 'black'
        setSquares(squares.slice())
    }
    let SetMarker = (i) => {
        let toastMessage = ""
        if(blockedNodes[i]) //is already a blocked node.  Nothing to do with those
            return
        if (barrier) { //manually setting barrier
            setNodeToBlocked(i)
            return
        } else if (startMarkerIndex === i) {
            setStartAndEndLocations(setStartMarkerIndex, i, 'grey', true)
            toastMessage = 'Deselected Start Location'
        } else if (startMarkerIndex < 0 && endMarkerIndex === i) {
            setStartAndEndLocations(setEndMarkerIndex, i, 'grey', true)
            toastMessage = 'Deselected End Location'
        } else if (startMarkerIndex < 0) {
            setStartAndEndLocations(setStartMarkerIndex, i, 'orange', false)
            toastMessage = "Start Location Selected"
        } else if (endMarkerIndex === i) {
            setStartAndEndLocations(setEndMarkerIndex, i, 'grey', true)
            toastMessage = "Deselected End Location"
        } else if (endMarkerIndex < 0) {
            setStartAndEndLocations(setEndMarkerIndex, i, 'cornflowerblue', false)
            toastMessage = 'Selected End Location'
        } else {
            return
        }
        return (addToast(toastMessage, {appearance: 'info', autoDismiss: true,}))
    }
    const clearSquares = () => {
        //squares not changing without setting squares explicitly
        for(let i = 0; i < squares.length; i++) {
            squares = Array(SIZE).fill('grey')
            setSquares(Array(SIZE).fill('grey'))
        }
    }
    const resetBoardOnDestinationChange = (temp) =>{
        for(let i = 0; i < squares.length; i++) {
            if (temp[i] !== 'black' && i !== startMarkerIndex && i !== endMarkerIndex) {
                temp[i] = 'grey'
            }
        }
        temp[startMarkerIndex] = 'orange'
        temp[endMarkerIndex] = 'cornflowerblue'
        return temp
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

    const randomizeWeights = async () =>
    {
        let date1 = new Date()
        setLoading(true)
        messagesForCard.messageSeparator()
        messagesForCard.updateMessages('Sending data for random weight generation', 'Frontend')
        await axios.post(testingUrl + 'weightGeneration', {SIZE})
            .then(res => {
                setLoading(false)
                messagesForCard.backendResponse(date1, res.data[0])
                setWeights(res.data[1])
            })
    }
    /**** WIP *********/
    const generatePrimsTree = async () => {
       // if (checkForValidMarkers(false) !== null)
        //    return
         messagesForCard.frontendInitialMessage("Sending data for Prims Minimum Spanning Tree", setLoading)
         setEndMarkerIndex(-1)
         setStartMarkerIndex(-1)
         let date1 = new Date()
         setLoading(true)
         messagesForCard.messageSeparator()
         clearGraph()
         messagesForCard.updateMessages('Sending data for maze generation', 'Frontend')
         const start = Math.floor(Math.random() * Math.floor(SIZE))
        console.log(start)
         await axios.post(testingUrl + 'primsTree', {start, SIZE, WIDTH, blockedNodes})
             .then(res => {
                 setStartMarkerIndex(start)
                 setSquares(squares.slice())
                 setLoading(false)
                 messagesForCard.backendResponse(date1, res.data[0])
                 const nodeArr = res.data[1][0]
                 const edgeArr = res.data[1][1]
                 const initialWeightList = res.data[1][2]
                 const endNodeList = res.data[1][3]
                 const visitedNodeList = res.data[1][4]
                 const finalWeights = res.data[1][5]
                 const orderOfTraversal = res.data[1][6]
                 const directionOfEdges = res.data[1][7]
                 let tempBlockedNodes = Array(SIZE).fill(false)

                 ///WORK ON tRYING TO ANIMATE ORDER OF TRAVERSAL



                 /*const sleep = (milliseconds) => {
                     const date = Date.now();
                     let currentDate = null;
                     do {
                         currentDate = Date.now();
                     } while (currentDate - date < milliseconds);
                 }*/

                 //FOR INITIAL SETUP DONT ERASE
                  for(let i = 0; i < nodeArr.length; i++)
                  {
                      squares[nodeArr[i]] = 'white'
                      weights[nodeArr[i]] = '\u221E'
                  }

                  //setStartMarkerIndex(-1)
                 //if(squares[endMarkerIndex]  !== 'white')
                  //   squares[endMarkerIndex] = 'grey'
                  //setEndMarkerIndex(-1)
                  //squares[startMarkerIndex] = 'orange'
                  //squares[endMarkerIndex] = 'cornflowerblue'
                  //setBlockedNodes(tempBlockedNodes)
                 // setSquares(squares.slice())
                 // setWeights(initialWeightList)

               // sleep(5000)
                 //FINAL RESULT
                 //console.log("after sleep")

                 for(let i = 0; i < weights.length; i++)
                 {
                     if(directionOfEdges[i][0] !== -1)
                     {
                         if(directionOfEdges[i][1] === "F")
                         {
                             weights[i] = ""
                             squares[i] = 'black'
                             blockedNodes[i] = true
                         }
                         else {
                             weights[i] = directionOfEdges[i][1]
                             squares[i] = 'white'
                         }
                     }
                     else
                     {
                         weights[i] = finalWeights[i]
                     }
                 }
                 squares[start] = 'orange'
                 setWeights(weights.slice())
                 setSquares(squares.slice())
                 setBlockedNodes(blockedNodes.slice())
             })
             .catch(err => {console.error(err)})

    }
    /**************************************/
    /* methods to control menus */

    let renderSquare = (count) => {
        return (<Square id={squares[count]} index={count} weight = {weights[count]} onClick={fork.bind(this, count)} key={count}/>)
    }
    let fork = (i) => {
        if(weightButton)
            setWeight(i)
        else
            SetMarker(i)
    }
    /***************************************/
    /* everything below is to render the board*/
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
    const menuDictionaryMethods = {backendDepthFirstSearch: backendDepthFirstSearch, backendBreathFirstSearch: backendBreathFirstSearch, backendDijkstra: backendDijkstra,
        generatePrimsMaze: generatePrimsMaze, generateBacktrack: generateBacktrack,
        clearGraph: clearGraph, randomizeWeights: randomizeWeights, clearWeights: clearWeights,
        generatePrimsTree: generatePrimsTree, barrier: barrier, setBarrier: setBarrier, weightButton: weightButton, setWeightButton: setWeightButton}

    return (
        <div id={"box"}>
            <div id={"leftBox"}>
                <Menu dictionary = {menuDictionaryMethods}/>
            </div>
            <div id={"centerBox"}>
                {parent}
                <div id={"rightBox"}>
                    <MyCard loading = {loading} clearMessages = {messagesForCard.clearCardMessages.bind(this)} messages = {cardMessages} header = {backendOrFrontEnd} />
                </div>
            </div>
        </div>
    );
}

export default Board