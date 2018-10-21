import React from 'react';
import './LoginPage.css';
// import { withRouter } from 'react-router-dom';
import RoundedButton from '../../atoms/RoundedButton/RoundedButton';
import axios from 'axios';
// import {
//     userProfileSetUserId,
// } from '../../../redux/actions';
// import { connect } from 'react-redux';

import LoginLayout from '../../organisms/LoginLayout/LoginLayout';
import InputTwoFA from '../../atoms/InputTwoFA/InputTwoFA';
import LoginContainer from '../../atoms/LoginContainer/LoginContainer';
import InputFieldLogin from '../../atoms/InputFieldLogin/InputFieldLogin';
class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.submitCredentialsHandle = this.submitCredentialsHandle.bind(this);
        this.state = {
            email: "",
            password: "",
            errors: "",
            emailConfirmationBackend: '',
            accountLoading: false,
            verifyLoading: false
        }
    }

    submitCredentialsHandle(e) {
        e.preventDefault();
        this.setState({ accountLoading: true });

        axios.post('http://207.180.216.94/api/v1/users/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                this.setState({ accountLoading: false });
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    this.setState({ accountLoading: false });
                    alert("401")
                    // this.props.showErrorMessage(error.response.data.error.message);
                } else if (error.response.status === 422) {
                    this.setState({ accountLoading: false });
                    alert("422")
                    // this.props.showErrorMessage(error.response.data.error.message);

                }
            });
    }

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }


    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })

    }

    render() {
        return (
            <LoginLayout>
                <div>
                    <LoginContainer>
                        <form onSubmit={this.submitCredentialsHandle}>
                            <InputFieldLogin type="email" changereduxdata={this.changeEmail} text={"Email"} placeholder="" value={this.props.email} maskChar={null} /> <br />
                            <InputFieldLogin type="password" changereduxdata={this.changePassword} text={"Password"} placeholder="" value={this.props.password} maskChar={null} />
                            <br />
                            <RoundedButton
                                loading={this.state.accountLoading}
                                style={{ display: 'block', margin: '0 auto', width: '150px' }}>
                                LOGIN
                            </RoundedButton>
                        </form>
                    </LoginContainer>
                </div>
                <div>
                </div>
            </LoginLayout>
        );
    }
}
export default LoginPage;

// const mapStateToProps = state => {
//     return {
//         userId: state.userProfile.userId,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         userProfileSetUserId: userId => dispatch(userProfileSetUserId(userId))
//     }
// }

// export default withRouter(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(LoginPage));