import React, { Component } from 'react';
import { Media, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

function RenderDish({dish}) {
}
function RenderComments(dish) {
    return dish.comments.map((comment) => {
        return (
            <li key={'dishdetail-'+ comment.id}>
                <i>{comment.comment}</i>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        )});
}
 const  DishDetail = ({dish=null}) => {
     console.log(dish === null)
    if( dish === null ){
        return (<></>)}
    else{
        return(
            <div>
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardBody>
                        <CardTitle>Comments:</CardTitle>    {console.log('DishDetail: props.dish: '+dish)}
                        <CardText><ul className="list-unstyled">{RenderComments(dish)}</ul></CardText>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardSubtitle>{dish.description}</CardSubtitle>
                    </CardImgOverlay>
                </Card>
            </div>
            </div>
        );
    }
}

export default DishDetail
