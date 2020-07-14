import React from "react";
import {Button} from "semantic-ui-react";

import {validateToken} from '../helper'

const {BACKEND_SRC = '//localhost:8080'} = process.env;

function Actions(props: any) {
    const {taskId, token, push, refreshTasks} = props;


    const onEditTask = () => push(`/task/${taskId}`);
    const onDeleteTask = () => {
        fetch(`${BACKEND_SRC}/api/task/${taskId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'x-access-token': token}
        })
            .then(r => r.json())
            .then(r => validateToken(r, push))
            .then(refreshTasks);
    };

    return (
        <div>
            <Button circular icon='delete' onClick={onDeleteTask} />
            <Button circular icon='eye' onClick={onEditTask} />
            <Button circular icon='edit' onClick={onEditTask} />

        </div>
    );
}

export default Actions;