import React from 'react'

import {Link} from 'react-router-dom'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailValid: null,
            passValid: null,
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    validateSignUp = (e) => {
        e.preventDefault();
        let {email, password} = this.state
        let validationArray = [0, 0, 0, 0, 0];
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationArray[4] = 1
        let caseCheck = password.split('')
        let capitalLetters = 0;
        let numbersInPass = 0;
        let specialCharacters = 0;
        let spacesInPass = 0;
        caseCheck.forEach(character => {
            if (/\s/.test(character)) {
                spacesInPass++
            } else if(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(character)) {
                specialCharacters++
            } else if (/\d/.test(character)) {
                numbersInPass++
            } else if (character === character.toUpperCase() && !/\d/.test(character)) {
                capitalLetters++
            } 
        });
        if(capitalLetters >= 1) validationArray[0] = 1;
        if(password.length >= 8) validationArray[1] = 1;
        if(numbersInPass >= 1) validationArray[2] = 1;
        if(specialCharacters >= 1) validationArray[3] = 1;
        if(spacesInPass > 0) validationArray[1] = 0;
        if(!validationArray.includes(0)) this.props.createUser(email, password.toString())
    }

        
    render() {
        return(
            <>
            <div className="loginRegisterDiv">
            <h1>Create a new account</h1>
                <form className="detailsForm" onSubmit={this.validateSignUp}>
                <label forHtml="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <p>Your password needs to have</p>
                    <ul>
                        <li>At least 1 Capital letter</li>
                        <li>At least 8 characters</li>
                        <li>At least 1 number</li>
                        <li>At least 1 special character (eg. !, ", ?, ~)</li>
                        <li>A total of 0 spaces</li>
                    </ul>
                    <label forHtml="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="submit"
                        value="Sign Up"
                    />
                </form>
            </div>
            <div className="loginRegisterDiv">
                <h2>Already have an account?</h2>
                <Link className="SignLogIn" to='/login'>Back to Log In</Link>
            </div>
            </>
        )
    }
}

export default SignUp