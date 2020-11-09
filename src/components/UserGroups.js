import React from 'react';
import { Link } from 'react-router-dom'

const UserGroups = props => {
    let totalGroupsUserIsIn = 0;

    const usersGroups = props.userGroups.map((group, index) => {
        let groupID = Object.keys(group)[0]
        let groupName = Object.values(group)[0]['name']
        return (
            <Link to={`/group/${groupID}`} key={index}>
                <div className="group" id={groupID}>
                    <p>{groupName}</p>
                </div>
            </Link>
        )

    })
    
    if(props.userGroups.length > 0){
        return (
            <div className="groupContainer">
                {usersGroups}
            </div>
        )
    } else {
        return(
            <div className="groupContainer">You are not yet part of any groups {totalGroupsUserIsIn}</div>
        )
    }
}

export default UserGroups