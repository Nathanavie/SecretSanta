import React from 'react'
import UserGroups from './UserGroups';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'Groups',
            groupName: '',
            groupRuleOne: '',
            groupRuleTwo: '',
            groupRuleThree: '',
            groupRuleFour: '',
            groupRuleFive: '',
            joinGroupID: '',
            userGroups:[]
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    createGroup = (e) => {
        e.preventDefault();
        let rules = [
            this.state.groupRuleOne,
            this.state.groupRuleTwo,
            this.state.groupRuleThree,
            this.state.groupRuleFour,
            this.state.groupRuleFive,
        ]
        this.props.createGroup(this.state.groupName, rules)
    }

    joinGroup = (e) => {
        e.preventDefault();
        this.props.joinGroup(this.state.joinGroupID)
    }

    getUsersGroups = () => {
       this.props.getGroups(this.props.uid).then(res => {
            this.setState({
                userGroups: Object.entries(this.props.userGroups)
            })
        })
    }

    render() {
        let { page } = this.state;
        if (page === "Create") {
            return (
                <div className="createGroups">
                    <h1>Create a group</h1>
                    <form onSubmit={this.createGroup}>
                        <label htmlFor="groupName">Group Name</label>
                        <input
                            type="text"
                            value={this.state.groupName}
                            onChange={this.handleChange}
                            name="groupName"
                            placeholder="Group Name"
                            required
                        />
                        <label htmlFor="rules">Enter Rules (Maximum of 5)</label>
                        <label htmlFor="ruleOne">Rule 1</label>
                        <input
                            type="text"
                            name="groupRuleOne"
                            onChange={this.handleChange}
                            value={this.state.groupRuleOne}
                        />
                        <label htmlFor="ruleOne">Rule 2</label>
                        <input
                            type="text"
                            name="groupRuleTwo"
                            onChange={this.handleChange}
                            value={this.state.groupRuleTwo}
                        />
                        <label htmlFor="ruleOne">Rule 3</label>
                        <input
                            type="text"
                            name="groupRuleThree"
                            onChange={this.handleChange}
                            value={this.state.groupRuleThree}
                        />
                        <label htmlFor="ruleOne">Rule 4</label>
                        <input
                            type="text"
                            name="groupRuleFour"
                            onChange={this.handleChange}
                            value={this.state.groupRuleFour}
                        />
                        <label htmlFor="ruleOne">Rule 5</label>
                        <input
                            type="text"
                            name="groupRuleFive"
                            onChange={this.handleChange}
                            value={this.state.groupRuleFive}
                        />
                        <input 
                            type="submit"
                            value="Create group"
                        />
                    </form>
                    <button onClick={() => this.setState({page: "groups"})}>Back</button>
                    <button onClick={() => this.props.logOutUser()}>Log Out</button>
                </div>
            )
        } else if(page === "Join") {
            return (
                <div className="joinGroups">
                    <h1>Join a group</h1>
                    <form onSubmit={this.joinGroup}>
                        <label htmlFor="joinGroupID">Group Code</label>
                        <input
                            type="text"
                            name="joinGroupID"
                            value={this.state.joinGroupID}
                            onChange={this.handleChange}
                        />
                        <input 
                            type="submit"
                            value="Join Group"
                        />
                    </form>
                    <button onClick={() => this.setState({page: "groups"})}>Back</button>
                    <button onClick={() => this.props.logOutUser()}>Log Out</button>
                </div>
            )
        } else {
            return (
                <div className="groups">
                    <h1>Home</h1>
                    <div>
                        <h2>Your Secret Santa Groups</h2>
                        <UserGroups userGroups={this.props.userGroups} uid={this.props.uid}/>
                    </div>
                    <div>
                        <h2>Create a Group</h2>
                        <button 
                        onClick={
                            () => this.setState({
                                page: 'Create',
                                groupName: '',
                                groupRuleOne: '',
                                groupRuleTwo: '',
                                groupRuleThree: '',
                                groupRuleFour: '',
                                groupRuleFive: '',
                                joinGroupID: ''
                            })}>
                        Create a group</button>
                    </div>
                    <div>
                        <h2>Join a Group</h2>
                        <button 
                        onClick={
                            () => this.setState({
                                page: 'Join',
                                groupName: '',
                                groupRuleOne: '',
                                groupRuleTwo: '',
                                groupRuleThree: '',
                                groupRuleFour: '',
                                groupRuleFive: '',
                                joinGroupID: ''
                            })}>
                        Join a group</button>
                    </div>
                </div>
            )
        }
    }
}

export default Home