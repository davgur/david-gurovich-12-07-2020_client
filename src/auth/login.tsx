import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom';
import {Button, Form} from "semantic-ui-react";

const {BACKEND_SRC = '//localhost:8080'} = process.env;
console.log(process.env)

function Login(router: any) {
    const [password, setPassword] = useState([]);
    const [login, setLogin] = useState([]);

    const handleLoginChange = (e: any) => {
        setLogin(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const onSublmit = async () => {
        const response = await fetch(`${BACKEND_SRC}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password})
        });
        const result = await response.json();
        window.localStorage.setItem('token', result.accessToken);
        router.history.push('/tasks')
    }

    return (
        <Form>
            <Form.Field>
                <label>Login</label>
                <input type={'text'} value={login} onChange={handleLoginChange} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type={'password'} value={password} onChange={handlePasswordChange} />
            </Form.Field>
            <Button type='submit' onClick={onSublmit}>Login</Button>
        </Form>
    );
}

export default withRouter(Login)