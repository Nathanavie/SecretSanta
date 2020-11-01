import React from 'react';
import firebase from '../firebase';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from './router/ProtectedRoute';
import PrivateRoute from './router/PrivateRoute';
import Login from '../components/Login';
import Home from '../components/Home';
import SignUp from '../components/SignUp';

class AppRouter extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            uid: null,
        }
    }

    authStateChanged = async () => {
        await firebase.auth().onAuthStateChanged(user => {            
            if(user){
                //Grab any neccessary data from database
                // console.log(user);
                this.setState({uid: user.uid});
            } else {
                this.setState({uid: "no-log"});
            }
        });
    }

    componentDidMount() {
        this.authStateChanged();        
    }

    componentWillUnmount() {
        
    }

    createUser = async(email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res);
            this.setState({uid: res.user.uid});
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    logInUser = async (email,password) => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                this.setState({uid: res.user.uid});
                this.authStateChanged();
            });
    }

    logOutUser = async () => {
        await firebase.auth().signOut();
        this.setState({uid: "no-log"});
    }   

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/">{ <Redirect to={"/login"} />}</Route>                    
                    <ProtectedRoute path="/signup" auth={this.state.uid} render={ () => <SignUp createUser={this.createUser}/>}/>
                    <ProtectedRoute path="/login" auth={this.state.uid} render={ () => <Login logIn={this.logInUser}/>}/>
                    <PrivateRoute path="/home" auth={this.state.uid} render={ () => <Home logOutUser={this.logOutUser}/>}/>
                </Switch>  
            </Router>
        );
    }
}

export default AppRouter