import { Loading } from './LoadingComponent';
import React, { Component } from 'react';
import { Media, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



function RenderDish({dish}) {
    return <p> {dish.name} {dish.description} </p>
}
function RenderComments({comments}) {
    return comments.map((comment) => {
        return (
            <Stagger in>
                {comments.map((comment) => {
                    return (
                        <Fade in>
                        <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                        </Fade>
                    );
                })}
                </Stagger>
        )});
}
 const  DishDetail = (props) => {

     if (props.isLoading) {
         return(
             <div className="container">
                 <div className="row">
                     <Loading />
                 </div>
             </div>
         );
     }
     else if (props.errMess) {
         return(
             <div className="container">
                 <div className="row">
                     <h4>{props.errMess}</h4>
                 </div>
             </div>
         );
     }
     else if( props.dish === null ){
        return (<></>)}
    else{
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                    <Card>
                        <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
                        <CardBody>
                            <CardTitle>{props.dish.name}</CardTitle>
                            <CardText>{props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </FadeTransform>
                </div>
                <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
                <CommentForm postComment={props.postComment} dishId={props.dish.id} resetFeedbackForm={props.resetFeedbackForm} />
                </div>
            </div>
            </div>
        );
    }
}

export default DishDetail
