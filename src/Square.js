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
            id: ''
        }
        this.onMouseEnterSquare = this.onMouseEnterSquare.bind(this)
        this.onMouseLeaveSquare = this.onMouseLeaveSquare.bind(this)
        this.onClick = this.onClick.bind(this)
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

    onClick() {
        this.props.onClick()
    }
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        if(nextState.id !== this.state.id)
            return true
        else return nextProps.id !== this.props.id;
    }
    render() {
        let stateId
        if(!this.state.hover)
            stateId = this.props.id
        else
            stateId = this.state.id
        console.log("This is state.id " + stateId)

        return (
            <Button
                variant="secondary"
                className="square"
                id={stateId}
                onMouseEnter={this.onMouseEnterSquare.bind()}
                onMouseLeave={this.onMouseLeaveSquare.bind()}
                onClick={this.onClick.bind()}>
            </Button>
        )
    }
}

export default Square

