import React from "react";
import Button from "react-bootstrap/Button";
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
        //this.setWeight()

    }
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        if(nextState.id !== this.state.id || this.props.weight !== nextProps.weight || this.props.id !== nextProps.id)
            return true
        return false;
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
                onClick={this.onClick.bind()}>
                {this.props.weight}
            </Button>
        )
    }
}

export default Square

