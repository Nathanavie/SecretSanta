import React from 'react'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

        
    render() {
        return(
            <>
                <input
                    type="email"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input
                    type="submit"
                    onClick={() => this.props.createUser(this.state.username, this.state.password)}
                />
            </>
        )
    }
}

export default SignUp