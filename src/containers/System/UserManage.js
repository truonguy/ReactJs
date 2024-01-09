import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    state = {

    }

    async componentDidMount() {
        try {
            let response = await getAllUsers('ALL');
            // console.log('check render 1', response);
            if (response && response.errCode === 0) {
                console.log('check render 2', response.users);
                this.setState({
                    arrUser: response.users
                });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    


    render() {

        let listUsers = this.state.arrUser;
        return (
            <div className="users-container">
                <div className='title text-center'>Manage User</div>
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
                            console.log('check map', user, index);
                            return(
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className='fas fa-pencil-alt'></i>Edit</button>
                                        <button className='btn-delete'><i className='fas fa-trash'></i>Delete</button>
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
