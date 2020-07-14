import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {Form, Button} from "semantic-ui-react";

import {validateToken} from '../helper'

const {BACKEND_SRC = '//localhost:8080'} = process.env;

function Task(props: any) {
    const {history: {push}, match: {params: {id}}} = props;
    const token: string = window.localStorage.getItem('token') || '';

    const [content, setContent] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);

    useEffect(() => {
        if (id !== 'new') {
            fetch(`${BACKEND_SRC}/api/task/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
                .then(r => r.json())
                .then(r => validateToken(r, push))
                .then(r => {
                    const {content, email, phone} = r;
                    setPhone(phone);
                    setEmail(email);
                    setContent(content);
                });
        }
    }, []);

    const handlerEmailChange = (e: any) => setEmail(e.target.value);
    const handlerContentChange = (e: any) => setContent(e.target.value);
    const handlerPhoneChange = (e: any) => setPhone(e.target.value);

    const addNew = () => {
        return fetch(`${BACKEND_SRC}/api/tasks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'x-access-token': token},
            body: JSON.stringify({content, email, created: Date.now(), phone})
        })
    }
    const update = () => {
        return fetch(`${BACKEND_SRC}/api/task/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'x-access-token': token},
            body: JSON.stringify({content, email, phone})
        })
    }
    const handlerOnSave = () => {
        (id === 'new' ? addNew() : update())
            .then(r => r.json())
            .then(r => validateToken(r, push))
            .then(r => push('/tasks'));
    }

    return (
        <Form>
            <Form.Field>
                <label>Email</label>
                <input value={email} onChange={handlerEmailChange} />
            </Form.Field>
            <Form.Field>
                <label>Telephone</label>
                <input value={phone} onChange={handlerPhoneChange} />
            </Form.Field>
            <Form.Field>
                <label>Content</label>
                <textarea value={content} onChange={handlerContentChange} />
            </Form.Field>
            <Button type='submit' onClick={handlerOnSave}>Submit</Button>
        </Form>
    );
}

export default withRouter(Task);