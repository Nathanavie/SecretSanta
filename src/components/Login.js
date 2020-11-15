import React from 'react'

import {Link} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailValid: '',
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
        if(validation) {
            this.props.logIn(email, password.toString());
        } else {
            this.setState({
                emailValid: 'error'
            })
        }
    }
    render() {
        return(
            <>
            <div className="loginRegisterDiv">
                <h1>Log in to your account</h1>
                <form className="detailsForm" onSubmit={this.validateForm}>
                    <label forHtml="email">Email Address</label>
                    <input
                        className={this.state.emailValid}
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
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
                        value="Login"
                    />
                </form>
            </div>
            <div className="loginRegisterDiv">
                <h2>Don't have an account yet?</h2>
                <Link className="SignLogIn" to={'./signup'}>Sign Up</Link>
            </div>
            </>
        )
    }
}

export default Login