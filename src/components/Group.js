import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Modal from './Modal'

const Group = props => {
    let pageURL = window.location.href;
    let slicePrefix = 'group/';
    let indexOfGroupID = pageURL.indexOf(slicePrefix) + slicePrefix.length;
    let groupID = pageURL.slice(indexOfGroupID, pageURL.length);
    let groupName;
    let groupMembers;
    let allUsers = props.allUsers;
    let groupAdmin;
    let groupStatus;
    const [showModal, setShowModal] = useState(false)
    let userInformation = [];
    const [buyingGroups, setBuyingGroups] = useState([]);
    let finalBuyingGroups = [];

    props.userGroups.map((group, index) => {
        let ID = Object.keys(group)[0]
        if(ID === groupID) {
            groupAdmin = Object.values(group)[0]['admin'];
            groupStatus = Object.values(group)[0]['status'];
            groupName = Object.values(group)[0]['name'];
            groupMembers = Object.values(group)[0]['members'];
            finalBuyingGroups = Object.values(group)[0]['buyingGroups'];
            console.log(Object.values(group)[0])
            return null
        } else {
            return null
        }
    })

    for(var key in groupMembers) {
        for(let user in allUsers) {
            if(user === key) {
                let name = `${allUsers[user].firstname} ${allUsers[user].surname}`;
                let boughtStatus = groupMembers[key].bought;
                userInformation.push([name, boughtStatus, key])
            } 
        }
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const memberInformation = userInformation.map((user, index) => {
        if(props.uid === user[2] && groupStatus === 'progress') {
            return (
                <div key={index} className="groupMember">
                    <p>{user[0]} <em>(You)</em></p>
                    {user[1] ? <p>They have bought their gift!</p> : <p>They have <strong>not</strong> bought their gift!</p>}
                    {user[1] ? <input type="button" value="You already bought your gift" disabled/>: <input onClick={toggleModal} type="button" value="I have bought my gift!"/>}
                </div>
            )
        } else {
            return (
                <div key={index} className="groupMember">
                    <p>{user[0]} {props.uid === user[2] ? <em>(you)</em> : null}</p>
                    {user[1] ? <p>They have bought their gift!</p> : <p>They have <strong>not</strong> bought their gift!</p>}
                </div>
            )
        }
    })

    const updateBoughtStatus = (id) => {
        props.bought(id)
    } 
    
    const setBuyers = () => {
        let buyers = [];
        let receivers = [];
        for(var key in groupMembers) {
            buyers.push(key)
            receivers.push(key)
        }
        shuffleArray(receivers)
        for(let i = 0; i < buyers.length; i++) {
            setBuyingGroups(buyingGroups.push([buyers[i], receivers[i]]))
        }
        props.buyers(groupID, buyingGroups)
        props.start(groupID)
    }
    
    //Sattolo's algorithm :-)
    const shuffleArray = (array) => {
        const len = array.length;
        for (let i = 0; i < len - 1; i++) { // 0 to n -1, exclusive because the last item doesn't need swapping
            let j = Math.floor(Math.random() *  (len-(i+1)))+(i+1); // i+1 to len, exclusive
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    const giftReceiver = finalBuyingGroups.map((pair, index) => {
        let receiver = '';
        let receiverName = '';
        if(pair[0] === props.uid) {
            receiver = pair[1]
        }
        for(var key in groupMembers) {
            if (key === receiver) {
                for(let user in allUsers) {
                    if(user === receiver) {
                        receiverName = `${allUsers[user].firstname} ${allUsers[user].surname}`;
                    } 
                }
            }
        }

        return (
            <span key={index}>{receiverName}</span>
        )
    })

    if(groupStatus === "setup") {
        return (
            <>
                {groupStatus === "setup" ? <h2>This Secret Santa has not yet started, you won't have a person to buy for yet!</h2> : <h2>This Secret Santa has begun, your person is {giftReceiver}</h2>}
                <h1>Group {groupName}</h1>
                {memberInformation}
                {props.uid === groupAdmin ? <><input type="button" value="Start The Secret Santa!" onClick={setBuyers}/><p>(No one will be able to join or leave once you click this)</p> </> : null}
                <Link to={'../home'}>Dashboard</Link>  

            </>
        )
    } else {
        return(
            <>
                {showModal ? <Modal bought={updateBoughtStatus} closeModal={toggleModal} groupID={groupID} /> : null}
                {groupStatus === "setup" ? <h2>This Secret Santa has not yet started, you won't have a person to buy for yet!</h2> : <h2>This Secret Santa has begun, your person is {giftReceiver}</h2>}
                <h1>Group {groupName}</h1>
                {memberInformation}
                <Link to={'../home'}>Dashboard</Link>            
            </>
        )
    }

}

export default Group