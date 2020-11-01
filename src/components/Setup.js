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
        //Save this data in a Firebase database
        this.setState({complete: true})
    }

    render() {
        let { complete, firstname, surname, dob, addressLine1, addressLine2, TownCity, PostCode } = this.state
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
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={this.handleChange}
                            />
                        <label>Surname</label>
                        <input
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={this.handleChange}
                            />
                        <label>Date Of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={dob}
                            onChange={this.handleChange}
                            />
                        <label>Address</label>
                        <label>Address Line 1</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={addressLine1}
                            onChange={this.handleChange}
                            />
                        <label>Address Line 2</label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={addressLine2}
                            onChange={this.handleChange}
                            />
                        <label>Town / City</label>
                        <input
                            type="text"
                            name="TownCity"
                            value={TownCity}
                            onChange={this.handleChange}
                            />
                        <label>PostCode</label>
                        <input
                            type="text"
                            name="PostCode"
                            value={PostCode}
                            onChange={this.handleChange}
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