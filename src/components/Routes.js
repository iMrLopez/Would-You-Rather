import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom'

import Dashboard from './Dashboard'
import LeaderBoard from './LeaderBoard'
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails"
import NotFound from "./NotFound"
import Logout from './Logout'


let notLoggedIn;

const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
    notLoggedIn === true
      ? <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      : <Component {...props} /> 
  )} />
)


function Routes(props) {
  notLoggedIn = props.notLoggedIn;
  return <div className="container">
    <Route path='/login' exact component={Login}/> 
    <PrivateRoute path='/' exact component={Dashboard} />
    <PrivateRoute path='/leaderboard' exact component={LeaderBoard} />
    <PrivateRoute path='/add' component={NewQuestion}/>
    <PrivateRoute path="/questions/:id" component={QuestionDetails} />
    <PrivateRoute exact path='/logout' component={Logout} />
    <PrivateRoute exact path='/404' component={NotFound} />
  </div>;
}

Routes.propTypes = {notLoggedIn: PropTypes.any};

export default Routes;