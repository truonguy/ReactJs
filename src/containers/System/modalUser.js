import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''

        }
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        /**
         * this.state= {
         * email: '',
         * password: '',
         * }
         * this.state.email === this.state.['email']
        */
        //bad code
        // this.state[id] = event.target.value

        // this.setState({
        //     ...this.state
        // }, ()=>{
        //     console.log('check bad code: ', this.state)
        // })

        //good code
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        });

    }

    checkValidateInput = () =>{
        let isValid = true;
        let arrayInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i=0; i<arrayInput.length; i++) {
            // console.log('check inside loop:', this.state[arrayInput[i]], arrayInput[i]);
            if(!this.state[arrayInput[i]]){
                isValid = false;
                alert('Missing parameter: '+ arrayInput[i]);
                break;
            }
        }
        return isValid;
    }

   handleAddNewUser = () => {
       let isValid = this.checkValidateInput();
       if(isValid===true){
        //call api create modal
        this.props.createNewUser(this.state);
       }
   }

  


    render() {
        // console.log('check child props', this.props)
        // console.log('check child open Modal', this.props.isOpen)
        return (
            <Modal isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            size='lg'
            >
            <ModalHeader toggle={()=>{this.toggle()}}>Create a new user</ModalHeader>
            <ModalBody>
                <div className='modal-user-body'>
                <div className='input-container'>
                        <label>Email</label>
                        <input 
                        type='text' 
                        onChange={(event) => {this.handleOnChangeInput(event, 'email') }}
                        value={this.state.email}
                        ></input>
                    </div>

                    <div className='input-container'>
                        <label>Password</label>
                        <input 
                        type='password' 
                        onChange={(event) => {this.handleOnChangeInput(event, 'password') }}
                        value={this.state.password}
                        ></input>
                    </div>

                    <div className='input-container'>
                        <label>First Name</label>
                        <input 
                        type='text' 
                        onChange={(event) => {this.handleOnChangeInput(event, 'firstName') }}
                        value={this.state.firstName}
                        ></input>
                    </div>


                    <div className='input-container'>
                        <label>Last Name</label>
                        <input 
                        type='text' 
                        onChange={(event) => {this.handleOnChangeInput(event, 'lastName') }}
                        value={this.state.lastName}
                        ></input>
                    </div>

                    <div className='input-container max-width-input'>
                        <label>Address</label>
                        <input 
                        type='text' 
                        onChange={(event) => {this.handleOnChangeInput(event, 'address') }}
                        value={this.state.address}
                        ></input>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button 
            color="primary" 
            className='px-3' 
            onClick={()=>{this.handleAddNewUser()}}>
                Add new
            </Button>{' '}
            <Button 
            color="secondary" 
            className='px-3' 
            onClick={()=>{this.handleAddNewUser()}}>
                Close
            </Button>
            </ModalFooter>
      </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




