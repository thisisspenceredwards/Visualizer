import React from "react";
import Button from "react-bootstrap/Button";
class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            id: 'grey',
            weight: 0
        }
        this.onMouseEnterSquare = this.onMouseEnterSquare.bind(this)
        this.onMouseLeaveSquare = this.onMouseLeaveSquare.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    onMouseEnterSquare() {
        console.log("this is id: "  + this.props.id)
        if(this.props.id === 'black')
            return
        this.setState({
            id: 'red',
            hover: true
        })
    }

    onMouseLeaveSquare() {
        this.setState({
            id: 'blue',
            hover: false
        })
    }
    onClick() {
        this.props.onClick()
    }
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return (nextState.id !== this.state.id || this.props.weight !== nextProps.weight || this.props.id !== nextProps.id)
    }
    render() {
        let stateId
        if(!this.state.hover)
            stateId = this.props.id
        else
            stateId = this.state.id
        const divStyle = {
            background: stateId
        }
        console.log("stateid: " + stateId)
        return (
            <Button
                variant="secondary"
                className="square"
                //id={stateId}
                style = {divStyle}
                onMouseEnter={this.onMouseEnterSquare.bind()}
                onMouseLeave={this.onMouseLeaveSquare.bind()}
                onClick={this.onClick.bind()}>
                {this.props.weight}
            </Button>
        )
    }
}

export default Square

