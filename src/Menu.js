import Button from "react-bootstrap/Button";
import React, {useState} from "react";


const Menu = (props) =>
{
    let barrierButton = props.dictionary.barrier
    let weightButton = props.dictionary.weightButton
    const [dropDownMenu, setDropDownMenu] = useState(Array(2).fill(false))
    const toggleOpen = (i) =>
    {
        const temp = [false, false]
        temp[i] = !dropDownMenu[i]
        setDropDownMenu(temp)
    }
    const createBarrier = () => {
        if(weightButton)
            setWeightButtonFunction()
        barrierButton = !barrierButton
        props.dictionary.setBarrier(barrierButton)
        if (barrierButton)
            document.getElementById("barrier").innerText = "Disable Barrier"
        else
            document.getElementById("barrier").innerText = "Draw Barrier"
    }
    const setWeightButtonFunction = () =>
    {
        if(barrierButton)
            createBarrier()
        weightButton = !weightButton
        props.dictionary.setWeightButton(weightButton)
        if(weightButton)
            document.getElementById("addWeights").innerText = "Toggle Weights Off"
        else
            document.getElementById("addWeights").innerText = "Set Weights"
    }
    const menuClass1 = `dropdown-menu ${ dropDownMenu[0]? " show": ""}`
    const menuClass2 = `dropdown-menu ${ dropDownMenu[1]? " show": ""}`
    return(
            <div id = "buttons1" className = "btn-group-vertical" role={"group"}>
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop" type="button"  onClick = {toggleOpen.bind(this, 0)} className="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded="false">
                        Shortest Path Algorithms
                    </button>
                    <div className={menuClass1} aria-labelledby="btnGroupDrop1">
                        <a id={"menuButton"} className = "btn btn-primary-controlButton" onClick = { props.dictionary.backendDepthFirstSearch.bind(this) }>
                            Depth First Search
                            <p> (Does path Exist)</p>
                        </a>
                        <a id={"menuButton"} className = "btn btn-primary-controlButton" onClick = { props.dictionary.backendBreathFirstSearch.bind(this) }>
                            Breath-First Search
                            <p>(Shortest Path)</p>
                        </a>
                        <a id={"menuButton"} className = "btn btn-primary-controlButton" onClick = { props.dictionary.backendDijkstra.bind(this) }>
                            Dijkstra's SPF
                        </a>
                    </div>
                </div>
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop" type="button"  onClick = {toggleOpen.bind(this, 1)} className="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown-menu" aria-haspopup="true" aria-expanded="false">
                        Maze Generation Algorithms
                    </button>
                    <div className={menuClass2} aria-labelledby="btnGroupDrop11">
                        <a id={"menuButton"} className = "btn btn-primary-controlButton1" onClick = { props.dictionary.generatePrimsMaze.bind(this) }>
                            Prim's Maze
                        </a>
                        <a id={"menuButton"} className = "btn btn-primary-controlButton1" onClick = { props.dictionary.generateBacktrack.bind(this) }>
                            Recursive Backtracking
                        </a>

                    </div>
                </div>
                <Button className = "btn btn-lg btn-primary-controlButton" onClick = {props.dictionary.clearGraph.bind(this)}>Clear Graph</Button>
                <Button className = "btn btn-lg btn-primary-controlButton"  id = "barrier" onClick = { createBarrier.bind(this)}>Draw Barrier</Button>
                <Button className = "btn btn-lg btn-primary-controlButton" id ="addWeights" onClick = { setWeightButtonFunction.bind(this) }>Set Weights</Button>
                <Button className = "btn btn-lg btn-primary-controlButton" id ="randomizeWeights" onClick = { props.dictionary.randomizeWeights.bind(this)}>Randomize Weights</Button>
                <Button className = "btn btn-lg btn-primary-controlButton" id = "randomizeWeights" onClick = { props.dictionary.clearWeights.bind(this)}>Remove Weights</Button>
                <Button className = "btn btn-lg btn-primary-controlButton" id = "randomizeWeights" onClick = { props.dictionary.generatePrimsTree.bind(this)}>Create Randomized Minimum Spanning Tree (not finished)</Button>
            </div>
    )
}

export default Menu