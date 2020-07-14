import React, {useEffect, useState} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {Segment, Button, Table} from "semantic-ui-react";
import Actions from './actions'

import {validateToken} from '../helper'

const {BACKEND_SRC = '//localhost:8080'} = process.env;


function Tasks(props: any) {
    const {history: {push}} = props;
    const token: string = window.localStorage.getItem('token') || '';
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        refreshTasks()
    }, [])

    const refreshTasks = () => fetch(`${BACKEND_SRC}/api/tasks`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'x-access-token': token}
    })
        .then(r => r.json())
        .then(r => validateToken(r, push))
        .then(setTasks);

    const renderTask = (task: any, i: number) => {
        const {email, phone, owner, created, id} = task;
        return (
            <Table.Row key={i}>
                <Table.Cell>{owner}</Table.Cell>
                <Table.Cell>{email}</Table.Cell>
                <Table.Cell>{phone}</Table.Cell>
                <Table.Cell>{created}</Table.Cell>
                <Table.Cell><Actions token={token} taskId={id} push={push} refreshTasks={refreshTasks} /></Table.Cell>
            </Table.Row>
        );
    }

    return (
        <Segment.Group>
            <Segment>
                <Button as={NavLink} to={'/task/new'}>Add new</Button>
                <Button as={NavLink} to={'/'} color='red' floated={'right'}>Logout</Button>
            </Segment>
            <Segment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Telephone</Table.HeaderCell>
                            <Table.HeaderCell>Created</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {tasks.map(renderTask)}
                    </Table.Body>
                </Table>
            </Segment>
        </Segment.Group>
    );
}

export default withRouter(Tasks);