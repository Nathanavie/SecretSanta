import React from 'react'

class Join extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageURL: window.location.href,
            slicePrefix: 'join/',
            groupID: ''
        }
    }

    componentDidMount() {
        let indexOfGroupID = this.state.pageURL.indexOf(this.state.slicePrefix) + this.state.slicePrefix.length;
        let groupID = this.state.pageURL.slice(indexOfGroupID, this.state.pageURL.length);
        this.setState({
            groupID: groupID
        })
    }

    joinGroup = (groupID) => {
        this.props.joinGroup(groupID);
        let link = window.location.href
        let suffix = link.indexOf('join')
        let prefix = link.slice(0, suffix)
        window.location.href = `${prefix}home`
    }



    render() {
        return(
            <>
            <h1>Join a group</h1>
            <p>You are joining a group with the ID: {this.state.groupID}</p>
            <button onClick={() => {this.joinGroup(this.state.groupID)}}>
                Join
            </button>
            </>
        )
    }
}

export default Join