import React, { Component } from 'react';
import { Media, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

function RenderDish({dish}) {
    return <p>This is RenderDish: {dish.name} {dish.description} </p>
}
function RenderComments({comments}) {
    return comments.map((comment) => {
        return (
            <li key={'dishdetail-'+ comment.id}>
                <i>{comment.comment}</i>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        )});
}
 const  DishDetail = ({dish, comments}) => {

    if( dish === null ){
        return (<></>)}
    else{console.log('dish.name: ' + dish.name)
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={dish} />
                </div>
                <div className="col-12 col-md-5 m-1">{console.log('comments[0]: ' + comments[0][0])}
                    <RenderComments comments={comments} />
                    <CommentForm />
                </div>
            </div>
            </div>
        );
    }
}

export default DishDetail
