import React from 'react';
import firebase from '../firebase';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from './router/ProtectedRoute';
import PrivateRoute from './router/PrivateRoute';
import Login from '../components/Login';
import Home from '../components/Home';
import Setup from '../components/Setup';
import SignUp from '../components/SignUp';
import Group from '../components/Group';
import Header from '../components/Header';

class AppRouter extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            uid: null,
            newUser: false,
            userEmail: '',
            userGroups: [],
            allGroups: [],
            allUsers: [],
            buyingGroups: []
        }
    }

    authStateChanged = async () => {
        await firebase.auth().onAuthStateChanged(user => {            
            if(user){
                this.setState({uid: user.uid}, () => {this.pullFromFirebase()});
            } else {
                this.setState({uid: "no-log"});
            }
        });
    }

    componentDidMount() {
        console.log('component mounted')
        this.authStateChanged();
    }

    createUser = async(email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            this.setState({
                uid: res.user.uid,
                newUser: res.additionalUserInfo.isNewUser,
                userEmail: res.user.email
            });
        })
        .catch(function(error) {
            console.error(error);
        });
    }

    setToBought = (groupID) => {
        let uid = this.state.uid;
        let db = firebase.database().ref(`/Groups/${groupID}/members/`);
        let user = {bought: true}
        db.child(uid).set(user)
    }

    startSecretSanta = (groupID) => {
        let db = firebase.database().ref(`/Groups/`);
        let user = {status: 'progress'}
        db.child(groupID).update(user)
    }

    addBuyingGroups = (groupID, groups) => {
        let db = firebase.database().ref(`/Groups/`);
        let data = {buyingGroups: groups}
        db.child(groupID).update(data).then(res => {
            let db = firebase.database().ref(`/`);
            let content;
            db.on("value", snapshot => {
                content = snapshot.val();
                let pairings = content.Groups[groupID]['buyingGroups']
                this.setState({
                    buyingGroups: pairings
                })
            })
        })
    }

    joinGroup = (groupID) => {
        let uid = this.state.uid;
        let allGroups = this.state.allGroups
        allGroups.map((group, index) => {
            let thisGroup = Object.entries(group);
            if(thisGroup[0][0] === groupID) {
                let user = {bought: false}
                let db = firebase.database().ref(`/Groups/${groupID}/members`);
                db.child(uid).set(user)
                return null
            } else {
                return null
            }
        })
    }

    createGroup = (name, rules) => {
        let uid = this.state.uid
        let groupData = {
            name: name,
            rules: rules,
            admin: uid,
            buyingGroups: {
                "0": "placeholder",
                "1": "placeholder"
            },
            status: 'setup',
            members: {
                [uid]: {
                    bought: false
                }
            }
        }
        this.pushToFirebase(true, groupData)
    }

    pushToFirebase = async(group, data) => {
        let path;
        if (group) {
            path = "Groups" 
        } else {
            path = "Users"
        }
        let db = firebase.database().ref(`/${path}`);
        if(group) {
            let id = this.getRandomString(6);
            db.child(id).set(data);
        } else {
            db.child(this.state.uid).set(data);
        }
    }

    pullFromFirebase = async() => {
        let db = firebase.database().ref(`/`);
        let content;
        let userID = this.state.uid; 
        db.on("value", snapshot => {
            content = snapshot.val()
            let allGroups = []
            let groupsUserIsIn = []
            let groups = Object.entries(content.Groups)
            groups.map((group, index) =>{
                let thisGroup = {
                    [group[0]]: {
                        admin: group[1]['admin'],
                        status: group[1]['status'],
                        buyingGroups: group[1]['buyingGroups'],
                        members: group[1]['members'],
                        name: group[1]['name'],
                        rules: group[1]['rules']
                    },
                }
                allGroups.push(thisGroup)
                let members = Object.keys(group[1].members);
                members.map((member, i) => {
                    if(member.includes(userID)) {
                        let usersGroup = {
                            [group[0]]: {
                                admin: group[1]['admin'],
                                status: group[1]['status'],
                                buyingGroups: group[1]['buyingGroups'],
                                members: group[1]['members'],
                                name: group[1]['name'],
                                rules: group[1]['rules']
                            },
                        }
                        groupsUserIsIn.push(usersGroup)
                    } 
                })
                this.setState({
                    userGroups: groupsUserIsIn,
                    allGroups: allGroups,
                    allUsers: content.Users
                })
            })
        })
        return content;

    }

    getRandomString = (length) => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    logInUser = async (email,password) => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                this.setState({uid: res.user.uid});
                this.authStateChanged().then(() => {
                    this.pullFromFirebase()
                });
            })
            .catch(error => {
                if(error.code === 'auth/user-not-found') {
                    let link = window.location.href
                    let suffix = link.indexOf('login')
                    let prefix = link.slice(0, suffix)
                    window.location.href = `${prefix}signup`
                } else if (error.code === 'auth/wrong-password') {
                    console.error(error.code)
                }
            });
    }

    updateGroups = async() => {
        this.pullFromFirebase();
    }

    logOutUser = async () => {
        await firebase.auth().signOut();
        this.setState({uid: "no-log"});
    }   

    render() {
        let { uid, newUser, userGroups, allUsers, buyingGroups } = this.state;
        return(
            <Router>
            <Header logOutUser={this.logOutUser} auth={uid} />
                <Switch>
                    <Route exact path="/">{ <Redirect to={"/login"} />}</Route>                    
                    <ProtectedRoute path="/signup" new={newUser} auth={uid} render={ () => <SignUp createUser={this.createUser}/>}/>
                    <ProtectedRoute path="/login" new={newUser} auth={uid} render={ () => <Login logIn={this.logInUser}/>}/>
                    <PrivateRoute path="/setup" auth={uid} render={ () => <Setup userEmail={this.state.userEmail} pushUser={this.pushToFirebase} logOutUser={this.logOutUser}/>}/>
                    <PrivateRoute path="/home" auth={uid} render={ () => <Home userGroups={userGroups} uid={this.state.uid} getGroups={this.updateGroups} joinGroup={this.joinGroup} createGroup={this.createGroup} logOutUser={this.logOutUser} push={this.pullFromFirebase}/>}/>
                    <PrivateRoute path="/group" auth={uid} render={ () => <Group buyingGroups={buyingGroups} buyers={this.addBuyingGroups} bought={this.setToBought} allUsers={allUsers} userGroups={userGroups} uid={uid} start={this.startSecretSanta}/>}/>
                </Switch>  
            </Router>
        );
    }
}

export default AppRouter