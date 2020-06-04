import React, {useState} from "react";
import Button from "react-bootstrap/Button";

const Square = (props) => {
    const [id, setId] = useState("")
    const [hover, setHover] = useState(false)

    const onMouseEnterSquare= () => {
        setId('redBackground')
        setHover(true)
    }
    const onMouseLeaveSquare = () => {
        setId('blueBackground')
        setHover(false)
    }
        let idState
        if(hover)
            idState = id
        else
            idState = props.id
        return (
            <Button
                variant = "secondary"
                className="square"
                id = {idState}
                onMouseEnter = {onMouseEnterSquare.bind()}
                onMouseLeave = {onMouseLeaveSquare.bind()}
                onClick = {props.onClick}>
            </Button>
        )
}

export default Square