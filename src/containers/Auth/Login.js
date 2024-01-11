import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeInputUsername = (event) => {
        this.setState({
            //cap nhat bien state
            username: event.target.value 
        })
    }

    handleOnChangeInputPassword = (event) => {
        this.setState({
            //cap nhat bien state
            password: event.target.value 
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage:''
        })
        try {
        let data = await handleLoginApi(this.state.username, this.state.password);
        if(data && data.errCode !== 0) {
            this.setState({
                errMessage: data.errMessage
            })
        }
        if(data && data.errCode === 0){
            this.props.userLoginSuccess(data.user)
            console.log('login success')
        }
        } catch (error) {
            if(error.response.data){
                this.setState({
                    errMessage:error.response.data.errMessage
                    })
            }
            console.log('truonguy', error.response)
            
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {

        return (
            <div className="login-background">
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your username'
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeInputUsername(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                            <input type={this.state.isShowPassword ? 'text' : 'password'} 
                            className='form-control' 
                            placeholder='Enter your password'
                            onChange={(event)=>{this.handleOnChangeInputPassword(event)}}
                            />
                            <span onClick={(event) => {this.handleShowHidePassword()}}>  
                            <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                            </span>
                            </div>

                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                        <button className='btn-login' onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                               <span className='text-other-login mt-3'>Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                        <i className="fab fa-google-plus-g google"></i>
                        <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
