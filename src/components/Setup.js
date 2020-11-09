import React from 'react'

import {Link} from 'react-router-dom'


class Setup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            complete: false,
            firstname: '',
            surname: '',
            dob: '',
            addressLine1: '',
            addressLine2: '',
            TownCity: '',
            PostCode: '',
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    submitDetails = (e) => {
        e.preventDefault();
        let user = {
            firstname: this.state.firstname,
            surname: this.state.surname,
            dob: this.state.dob,
            addressLine1: this.state.addressLine1,
            addressLine2: this.state.addressLine2,
            TownCity: this.state.TownCity,
            PostCode: this.state.PostCode,
            Email: this.props.userEmail,
            Groups: []
        }
        this.props.pushUser(false, user);
        let link = window.location.href
        let suffix = link.indexOf('setup')
        let prefix = link.slice(0, suffix)
        window.location.href = `${prefix}home`
    }

    render() {
        let { complete, firstname, surname, dob } = this.state
        if(complete) {
            return(
                <>
                    <h1>Your details have been saved</h1>
                    <p>You may now continue to your dashboard</p>
                    <Link to={'/home'}>Continue to Dashbaord</Link>
                </>
            )
        } else {
            return(
                <>
                    <h1>New Account setup</h1>
                    <h4>Please enter details about yourself</h4>
                    <p>Add some details about youself so your secret santa can appropriately send you your gift!</p>
                    <p>These details are kept securely and will not be shared</p>
                    <form onSubmit={this.submitDetails}>
                        <label>First Name *</label>
                        <input
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={this.handleChange}
                            required
                            />
                        <label>Surname *</label>
                        <input
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={this.handleChange}
                            required
                            />
                        <label>Date Of Birth *</label>
                        <input
                            type="date"
                            name="dob"
                            value={dob}
                            onChange={this.handleChange}
                            required
                            />
                        <input
                            type="submit"
                            value="Save these details"
                            />
                    </form>
                    <input
                        type="submit"
                        value="Log Out"
                        onClick={() => this.props.logOutUser()}
                        />
                </>
            )
      }
    }
}

export default Setup