import { Col, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";
import './NavMenu.css';
import { Hospitals } from './Hospitals';

export class FetchIllnesses extends Component {
    displayName = FetchIllnesses.name

    constructor(props) {
        super(props);
        this.state = {
            objillnesses: [], loading: true, selIllness: ''
        };
    }

    componentDidMount() {

        var url = 'http://dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses';

        var requestoptions = { method: 'GET' }

        fetch(url, requestoptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ objillnesses: data._embedded.illnesses, loading: false, selIllness: '' })
            });
    }

    render() {

        const divStyle = {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
        };



        const items = this.state.objillnesses.map(objillness => {
            return {
                id: objillness.illness.id,
                content: objillness.illness.name
            }
        });

        return (
            <div class="flexbox-container">
                <List selection> 
                    <List.Item>
                    <List.Header>
                        Select an illness
                        <br />
                                <Hospitals items={items} />
                         </List.Header>
                    </List.Item>
                    </List>
            </div>
        )
    }

}
ReactDOM.render(
    <FetchIllnesses>
        <Hospitals />
    </FetchIllnesses>,
    document.getElementById("root")
);
