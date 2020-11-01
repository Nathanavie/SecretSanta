import React from 'react'

import {Link} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailValid: null,
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    validateForm = (e) => {
        e.preventDefault();
        let {email, password} = this.state;
        let validation = false;
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validation = true;
        if(validation) this.props.logIn(email, password.toString());
    }
    render() {
        return(
            <>
            <form onSubmit={this.validateForm}>
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
                    value="Login"
                />
            </form>

            <Link to={'./signup'}>Sign Up</Link>
            </>
        )
    }
}

export default Login