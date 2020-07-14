import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import Auth from './auth/container'
import TaskContainer from './task/tasks'
import Task from './task/taskItem'

function App() {
    return (
        <Switch>
            <Route exact path='/' component={Auth} />
            <Route path='/tasks' component={TaskContainer} />
            <Route path='/task/:id' component={Task} />
        </Switch>
    );
}

export default App;
