import React from 'react';
import './LoginPage.css';
// import { withRouter } from 'react-router-dom';
import RoundedButton from '../../atoms/RoundedButton/RoundedButton';
import axios from 'axios';
// import {
//     userProfileSetUserId,
// } from '../../../redux/actions';
// import { connect } from 'react-redux';
import {
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button,
    Table,
    TabContent,
    TabPane,
    FormGroup,
    Label,
    Input,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Media,
    Form,
  } from 'reactstrap';
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
                        <h2>Sign In</h2>
                        <Form className="form" onSubmit={this.submitCredentialsHandle}>
                            <Col style={{padding: 0}}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        placeholder="myemail@email.com"
                                        onInput={this.changeEmail}
                                    />
                                </FormGroup>
                            </Col>
                            <Col style={{padding: 0}}>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        placeholder="********"
                                        onInput={this.changePassword}
                                    />
                                </FormGroup>
                            </Col>
                            <Button>Submit</Button>
                        </Form>
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