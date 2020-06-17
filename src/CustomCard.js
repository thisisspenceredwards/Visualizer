import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";

const MyCard = (props) =>
{
    const holder = [];
    for(let i = 0; i < props.messages.length; i++)
    {//values will not be sorted or changed in any way such that using the index for the key should be fine
        holder.push( <Card.Title key = {"Title" + i} >{props.header[i]}</Card.Title>)
        holder.push(  <Card.Text key = {"Message" + i}>{props.messages[i]}</Card.Text>)
    }
    return (
    <Card className="text-center">
        <Card.Header>
            <Button id={"headerButton"} onClick = {props.clearMessages.bind(this)}>Clear Messages</Button>
            Messages Sent and Received
        </Card.Header>
        <Card.Body>
            {holder}
        </Card.Body>
    </Card>)
}
export default MyCard