import React from 'react';

const Modal = props => {
    return (
        <div class="modal">
            <h4>Are you sure?</h4>
            <p>If you have not purchased your item, go back!</p>
            <strong><p>This CANNOT be undone!</p></strong>
            <input type="button" value="I am sure" onClick={() => props.bought(props.groupID)} />
            <input type="button" value="Go back!" onClick={props.closeModal} />
        </div>
    )
}

export default Modal