import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService} from '../../services/userService'
import modalUser from './modalUser';
import ModalUser from './modalUser';
import { reject } from 'lodash';
import {emitter} from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    state = {

    }

    async componentDidMount() {
        try {
            await this.getAllUserFromReact()
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    getAllUserFromReact = async() => {
        let response = await getAllUsers('ALL');
            if (response && response.errCode === 0) {
                this.setState({
                    arrUser: response.users
                });
            }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }


    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    
    createNewUser =async (data) => {
        try {
        let response = await createNewUserService(data);
        if(response && response.errCode !== 0) {
            alert(response.errMessage);
        }else{
            await this.getAllUserFromReact()
            this.setState({
                isOpenModalUser: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id'})
        }
        } catch (error) {
            console.log(error);
        }
       }


       handleDeleteUser = async (user) => {
        console.log('click detele', user)
        try {
          let res =  await deleteUserService(user.id)
          if(res && res.errCode === 0) {
            await this.getAllUserFromReact()
          }else{
            alert(res.errMessage);
          }
        } catch (error) {
            console.log(error);
        }
       }


    render() {
        let listUsers = this.state.arrUser;
        return (
            <div className="users-container">
                <ModalUser
                isOpen={this.state.isOpenModalUser}
                toggleFromParent={this.toggleUserModal}
                createNewUser={this.createNewUser}
                />
                <div className='title text-center'>Manage User</div>
                <div className='mx-3'>
                    <button className='btn btn-primary px-3'
                    onClick={() =>this.handleAddNewUser()}>
                        <i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    
                <table id="customers">
                
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    
                        { listUsers && listUsers.map((user, index) => {
                            // console.log('check map', user, index);
                            return(
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className='fas fa-pencil-alt'></i>Edit</button>
                                        <button className='btn-delete' onClick={()=> this.handleDeleteUser(user) }><i className='fas fa-trash'></i>Delete</button>
                                    </td>
                                    </tr>
                            )
                        })
                            
                        }
                    
                    
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
