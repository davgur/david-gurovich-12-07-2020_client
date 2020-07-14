import React, {useEffect, useState} from "react";
import {Button, Form, Checkbox} from "semantic-ui-react";

const {BACKEND_SRC = '//localhost:8080'} = process.env;
console.log(process.env)

export default function Registration() {
    const [password, setPassword] = useState([]);
    const [login, setLogin] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLoginChange = (e: any) => {
        setLogin(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const handleIsAdminChange = (e: any, data: any) => {
        setIsAdmin(data.checked);
    }

    const onSublmit = async () => {
        const response = await fetch(`${BACKEND_SRC}/auth/register`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password, isAdmin})
        });
        return await response.json();
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
            <Form.Field>
                <label>Is admin</label>
                <Checkbox onChange={handleIsAdminChange} />
            </Form.Field>
            <Button type='submit' onClick={onSublmit}>Registration</Button>
        </Form>
    );
}