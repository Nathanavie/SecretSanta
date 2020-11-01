import React from 'react'

class Home extends React.Component {
    render() {
        return(
            <>
                <h1>Home</h1>
                <input
                    type="submit"
                    value="Log Out"
                    onClick={() => this.props.logOutUser()}
                />
            </>
        )
    }
}

export default Home