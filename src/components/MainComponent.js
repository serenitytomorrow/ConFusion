import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';

import DishDetail from './DishdetailComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Test from './Test';
import About from './AboutComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';

import { connect } from 'react-redux';
import { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchLeaders: () => { dispatch(fetchLeaders())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback:  (firstname, lastname, telnum, email, message) => dispatch(postFeedback(firstname, lastname, telnum, email, message))
});


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: [],
      comments: [],
      promotions: [],
      leaders: []
    };
  }
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
    }
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }

      render() {

          const HomePage = () => {
            return(

                          <Home
                              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                              dishesLoading={this.props.dishes.isLoading}
                              dishErrMess={this.props.dishes.errMess}
                              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                              promoLoading={this.props.promotions.isLoading}
                              promoErrMess={this.props.promotions.errMess}

                              leaders={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                              leadersLoading={this.props.leaders.isLoading}
                              leadersErrMess={this.props.leaders.errMess}
                          />

            );
          }

          const DishWithId = ({match}) => {
              const tmp1 = this.props.comments.comments
              const tmp2 = this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))
              console.log(tmp1)
              console.log(tmp2)
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                  commentsErrMess={this.props.comments.errMess}
                  postComment={this.props.postComment}
                  resetFeedbackForm={this.props.resetFeedbackForm}
                />
            );
          };

              return (
                <div>
                  <Header />
                  <div>
                  <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                      <Switch location={this.props.location}>
                          <Route path='/home' component={HomePage} />
                          <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} />} />
                          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                          <Route path='/menu/:dishId' component={DishWithId} />
                          <Route exact path='/contactus' component={() => <Contact postFeedback={this.props.postFeedback}  resetFeedbackForm={this.props.resetFeedbackForm} />} />
                          <Route path='/menu/test' component={Test} />
                          <Redirect to="/home" />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                  </div>
                  <Footer />
                </div>
              );
            }
          }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
