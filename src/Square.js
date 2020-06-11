import React, {useState} from "react";
import Button from "react-bootstrap/Button";

/*
const Square = (props) => {

    const[hover, setHover] = useState(false)
    const[id, setId] = useState('')

    const onMouseEnterSquare = () => {
        setHover(true)
        setId('redBackground')
    }

    const onMouseLeaveSquare = () => {
        setHover(false)
        setId('blueBackground')
    }

    const onClick = () => {
        console.log("called")
        props.onClick()
    }
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        if(nextState.id !== this.state.id)
            return true
        else return nextProps.id !== this.props.id;
    }
    let stateId
    if(!hover)
        stateId = id
    else
        stateId = id
    console.log("This is state.id " + stateId)
        return (
            <Button
                variant="secondary"
                className="square"
                id={stateId}
                onMouseEnter={onMouseEnterSquare.bind()}
                onMouseLeave={onMouseLeaveSquare.bind()}
                onClick={onClick.bind()}>
            </Button>
        )
}
export default Square


*/

class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            id: '',
            weight: 0
        }
        this.onMouseEnterSquare = this.onMouseEnterSquare.bind(this)
        this.onMouseLeaveSquare = this.onMouseLeaveSquare.bind(this)
        this.onClick = this.onClick.bind(this)
        this.setWeight = this.setWeight.bind(this)
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
            hover: false
        })
    }
    setWeight(){
        console.log("set Weight: " + this.props.id)
        if(this.props.id !== 'startMarker' && this.props.id !== 'endMarker')
        {
            this.props.setWeight()
        }
    }
    onClick() {
        this.props.onClick()
        //this.setWeight()

    }
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        if(nextState.id !== this.state.id || this.state.weight !== nextProps.weight)
            return true
        else return nextProps.id !== this.props.id;
    }
    render() {
        let stateId
        if(!this.state.hover)
            stateId = this.props.id
        else
            stateId = this.state.id
        return (
            <Button
                variant="secondary"
                className="square"
                id={stateId}
                onMouseEnter={this.onMouseEnterSquare.bind()}
                onMouseLeave={this.onMouseLeaveSquare.bind()}
                onClick={this.onClick.bind()}>{this.props.weight}
            </Button>
        )
    }
}

export default Square

