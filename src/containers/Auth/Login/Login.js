//https://medium.com/@harittweets/sign-in-with-google-with-react-and-firebase-81076135b65d

import React, { Component } from 'react'
import { app, googleProvider, base, ref } from '../../../database/Database'
import './Login.css';
import { Form, Col, FormGroup,  FormControl, Button, InputGroup, Glyphicon, Alert } from 'react-bootstrap';

class Login extends Component {

    state = {
        redirect: false,
        user: null,
        authenticated: false,
        email: '',
        password: '',
        error: null,
        loading: null,
        isTyping: false,
    };

    addUpdateUserHandler(user) {

        const loggedUser = {
            name: user.displayName !== null ? user.displayName : user.email,
            email: user.email,
            phone: user.phoneNumber,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            photoURL: user.photoURL,
            countLogs: 0,
            uid: user.uid
        }

        //console.log('[Login.js] addUpdateUserHandler() uid', user.uid);
        //console.table(loggedUser);

        const key = user.uid;

        //Check if the user already exists
        base.fetch('users/' + user.uid, {
            context: this,
            asArray: false //Will return the object
        }).then(data => {

            //console.log('[Login.js] addUpdateUserHandler() uid', user.uid);
            //console.table(data);

            if (data.countLogs === null || data.countLogs === undefined) {
                ref.child('users').child(key).set(loggedUser);

            } else {

                loggedUser.countLogs = data.countLogs + 1;
                ref.child('users').child(key).update(loggedUser);

            }

        }).catch(error => {/*handle error*/ });

    }

    authWithGoogle() {

        //console.log("We're authing with Google");

        app.auth().signInWithPopup(googleProvider)
            .then((result, error) => {
                if (error) {
                    //this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" })
                    alert("Unable to sign in with Google");
                    this.setState({ error: error.message, isTyping: false })
                } else {
                    this.setState({ redirect: true, authenticated: true });

                    this.addUpdateUserHandler(result.user);

                }
            });
    }

    authWithEmailPassword() {
        /*console.log("We're authing with password")
        console.table([{
            email: this.emailInput.value,
            password: this.passwordInput.value,
        }])*/

        const email = this.state.email;
        const password = this.state.password;

        app.auth().signInWithEmailAndPassword(email, password)
            .then((result, error) => {

                this.setState({ error: null, loading: false });

                this.addUpdateUserHandler(result);


            })
            .catch((error) => {

                if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
                    console.info(error);

                    this.setState({ error: error.message, loading: false });

                    return;
                }

                app.auth().createUserWithEmailAndPassword(email, password)
                    .then((result, error) => {
                        this.setState({ error: null, loading: false });
                        this.addUpdateUserHandler(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            });

    }

    render() {


        let displayAlert = null;


        if (this.state.error !== null) {

            displayAlert = (

                <Alert bsStyle="warning">
                    <p><strong>Holy guacamole!</strong> {this.state.error}</p>
                </Alert>

            );

        }


        return (

            <div>

                {displayAlert}

                <div className="login">

                    <Form horizontal>
                        <FormGroup controlId="email" >
                            <Col sm={12}>
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <Glyphicon glyph="envelope" />
                                    </InputGroup.Addon>
                                    <FormControl
                                        type="email"
                                        placeholder="Email"
                                        onChange={
                                            event => {
                                                this.setState({ email: event.target.value, isTyping: true });
                                            }
                                        }
                                        value={this.state.email}
                                    />
                                </InputGroup>
                            </Col>

                        </FormGroup>

                        <FormGroup controlId="password" >
                            <Col sm={12}>
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <Glyphicon glyph="lock" />
                                    </InputGroup.Addon>
                                    <FormControl
                                        type="password"
                                        placeholder="Password"
                                        onChange={
                                            event => {
                                                this.setState({ password: event.target.value });
                                            }
                                        }
                                        value={this.state.password}
                                    />
                                </InputGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="signin">
                            <Col sm={12}>
                                <Button bsStyle="primary" onClick={() => this.authWithEmailPassword()}>Sign In</Button>
                                <hr />
                                <Button bsStyle="danger" onClick={() => this.authWithGoogle()}>Sign in with Goolge</Button>
                            </Col>
                        </FormGroup>

                    </Form>

                </div>

            </div>


        )

    }

}

export default Login

/*

return (
            <div style={loginStyles}>
                <button style={{ width: "100%" }} className="pt-button pt-intent-primary" onClick={() => this.authWithGoogle()}>Log In with Google</button>
                <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                <form onSubmit={(event) => this.authWithEmailPassword(event)}>
                    <div style={{ marginBottom: "10px" }} className="pt-callout pt-icon-info-sign">
                        <h5>Note</h5>
                        If you don't have an account already, this form will create your account.
                    </div>
                    <label className="pt-label">
                        Email
                    <input style={{ width: "100%" }} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
                    </label>
                    <label className="pt-label">
                        Password
                    <input style={{ width: "100%" }} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
                    </label>
                    <input style={{ width: "100%" }} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
                </form>
            </div>
        )

*/