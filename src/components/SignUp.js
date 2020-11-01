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
            <form onSubmit={this.validateSignUp}>
                <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
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
                <Link to='/login'>Back to Log In</Link>
            </>
        )
    }
}

export default SignUp