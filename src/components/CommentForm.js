import React, { Component } from 'react';
import { Media, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Modal, ModalHeader, ModalBody } from 'reactstrap';
 import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


export default class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            author: '',
            comment: '',
            rating: '',
            touched: {
                author: false,
                comment: false,
                rating: false
            }
        };
         this.toggleModal = this.toggleModal.bind(this);




      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleBlur = this.handleBlur.bind(this);

  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
}

  handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
  }

  handleSubmit(values) {
      console.log('Current State is: ' + JSON.stringify(values));
      alert('Current State is: ' + JSON.stringify(values));
      // event.preventDefault();
  }
  handleBlur = (field) => (evt) => {
      this.setState({
          touched:  { ...this.state.touched, [field]: true}
      })
  }

  validate(author, comment, rating ){
      const errors = {
          author: '',
          comment: '',
          rating: ''
      }
      if(this.state.touched.author && author.length < 3)
          errors.author = 'Name should be >= 3 chars'
      else if(this.state.touched.author && author.length > 10)
          errors.author = 'Name should be <= 10 chars'

      return errors
  }

    render(){
        return(
            <>
            <Button outline onClick={this.toggleModal}>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Your Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                    <Row className="form-group">
                        <Label htmlFor="author" md={2}>Author</Label>
                        <Col md={10}>
                            <Control.text model=".author" id="author" name="author"
                                placeholder="Author"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                 />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                             />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        <Col md={10}>

                                 <Input type="select" name="rating" id="rating">
                                   <option>1</option>
                                   <option>2</option>
                                   <option>3</option>
                                   <option>4</option>
                                   <option>5</option>
                                </Input>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="review" md={2}>review</Label>
                        <Col md={10}>
                            <Input type="textarea" name="review" id="review" />
                        </Col>
                    </Row>
                </LocalForm>
                </ModalBody>
            </Modal>
            </>
        )
    }
}
