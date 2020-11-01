import React from 'react';
import firebase from '../firebase';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from './router/ProtectedRoute';
import PrivateRoute from './router/PrivateRoute';
import Login from '../components/Login';
import Home from '../components/Home';
import Setup from '../components/Setup';
import SignUp from '../components/SignUp';
import Header from '../components/Header';

class AppRouter extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            uid: null,
            newUser: false
        }
    }

    authStateChanged = async () => {
        await firebase.auth().onAuthStateChanged(user => {            
            if(user){
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
            this.setState({
                uid: res.user.uid,
                newUser: res.additionalUserInfo.isNewUser
            });
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
                console.log('this is login result', res)
                this.setState({uid: res.user.uid});
                this.authStateChanged();
            })
            .catch(error => {
                if(error.code === 'auth/user-not-found') {
                    console.log(window.location.href)
                    let link = window.location.href
                    let suffix = link.indexOf('login')
                    let prefix = link.slice(0, suffix)
                    window.location.href = `${prefix}signup`
                } else if (error.code === 'auth/wrong-password') {
                    console.log(error.code)
                }
            });
    }

    logOutUser = async () => {
        await firebase.auth().signOut();
        this.setState({uid: "no-log"});
    }   

    render() {
        let { uid, newUser } = this.state;
        return(
            <Router>
            <Header auth={uid} />
                <Switch>
                    <Route exact path="/">{ <Redirect to={"/login"} />}</Route>                    
                    <ProtectedRoute path="/signup" new={newUser} auth={uid} render={ () => <SignUp createUser={this.createUser}/>}/>
                    <ProtectedRoute path="/login" new={newUser} auth={uid} render={ () => <Login logIn={this.logInUser}/>}/>
                    <PrivateRoute path="/setup" auth={uid} render={ () => <Setup logOutUser={this.logOutUser}/>}/>
                    <PrivateRoute path="/home" auth={uid} render={ () => <Home logOutUser={this.logOutUser}/>}/>
                </Switch>  
            </Router>
        );
    }
}

export default AppRouter