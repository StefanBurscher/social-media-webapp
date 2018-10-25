import React, { Component } from 'react'
import './LoginLayout.css'
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';


export default class LoginLayout extends Component {
    rotation() {
        document.getElementsByClassName('auth-page-container')[0].classList.toggle('flip');
    }
    render() {
        return (
            <div className="body-container columnNoPadding">
                <div className="auth-page-container">

                    <div className="main-form front">

                        <div style={{ minHeight: '100vh' }}>
                            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                                <br />
                                {/* <Link to="/" className="d-block text-center">
                                    Social media
                                    <br />
                                </Link> */}
                                {this.props.children[0]}
                                <br />
                            </div>
                        </div>
                    </div>

                    <div className="main-form back">
                        <div style={{ minHeight: '100vh' }}>
                            <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%' }}>
                                {/* <Link to="/" className="d-block text-center">
                                    Social media
                                    <br />
                                </Link> */}
                                {this.props.children[1]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
