import React, {Component} from 'react';
import Header from './HeaderComponent.js';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import About from './AboutComponent.js';
import { addComment, fetchDishes } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }

}
const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => { dispatch(fetchDishes())},
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class MainComponent extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrmess={this.props.dishes.errmess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}

                />
            );
        }
        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errmess={this.props.dishes.errmess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment} />

            );
        }
        return (
            <div >
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
