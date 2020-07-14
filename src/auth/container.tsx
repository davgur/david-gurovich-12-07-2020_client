import React from "react";
import {withRouter} from 'react-router-dom';
import {Container, Segment, Header, Divider, Grid} from "semantic-ui-react";
import Login from "./login";
import Registration from "./regisration";

const {BACKEND_SRC = '//localhost:8080'} = process.env;

function AuthContainer(router: any) {


    return (
        <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>

                <Grid.Column verticalAlign='middle'>
                    <Container>
                        <Header as="h2">Login</Header>
                        <Login />
                    </Container>
                </Grid.Column>


                <Grid.Column verticalAlign='middle'>
                    <Container>
                        <Header as="h2">Register new user</Header>
                        <Registration />
                    </Container>
                </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
        </Segment>
    );
}

export default withRouter(AuthContainer);