import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";

const MyCard = (props) =>
{
    /*
    <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
                {props.messages}
            </Card.Text>
     */
    const holder = [];
    for(let i = 0; i < props.messages.length; i++)
    {
        holder.push( <Card.Title>{props.header[i]}</Card.Title>)
        holder.push(  <Card.Text>{props.messages[i]}</Card.Text>)
    }
    return (
    <Card className="text-center">
        <Card.Header>
            <Button id={"headerButton"} onClick = {props.clearMessages.bind(this)}>Clear Messages</Button>
            Messages Sent and Received
        </Card.Header>
        <Card.Body>
            {holder}
            {holder}
            {holder}
            {holder}
            {holder}
            {holder}
        </Card.Body>
    </Card>)
}
export default MyCard