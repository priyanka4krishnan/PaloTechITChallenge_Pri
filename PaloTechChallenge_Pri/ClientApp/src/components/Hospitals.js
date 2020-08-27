import React, { Component, Fragment } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Icon, Form, List, Table } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";
import './NavMenu.css';


export class Hospitals extends Component {
    displayName = Hospitals.name

    constructor(props) {
        super(props);
        this.state = {
            formVisible: false, selIllness: '' , 
            objhospitals: [], showHospitals: false, userName: '', selPainLevel: '',
            AllWaitingLists: [{ WaitingTime: '', Name: '', Id: '' }], Patients: [{ userName: '', selPainLevel: '', selIllness: '' }]
        };
    }

    componentDidMount() {

        var url = 'http://dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals';

        var requestoptions = { method: 'GET' }

        fetch(url, requestoptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    objhospitals: data._embedded.hospitals
                })
            });
       
    }

    handleFormVisibility = (e) => {
        this.setState({ formVisible: true, selIllness: e.target.innerText });
    }

    FormHospitals = (e) => {
        this.state.AllWaitingLists = [];

        var showList = [{ WaitingTime: '', Name: '', Id: '' }];

        this.state.objhospitals.forEach(objhospital => {
            var waitinglist = objhospital.waitingList;

            waitinglist.forEach(item => {
                if (item.levelOfPain == e.target.id) {
                    showList.push({ WaitingTime: item.averageProcessTime, Name: objhospital.name, Id: objhospital.Id })
                }
            })
        });
        this.state.AllWaitingLists = showList.sort(function (a, b) { return a.WaitingTime - b.WaitingTime });
        this.setState({ showHospitals: true, selPainLevel: e.target.id });
    }

    updatePatient = (e) => {
        this.state.Patients.push({ userName: this.state.userName, selPainLevel: this.state.selPainLevel, selIllness: this.props.illness})
    }

    updateInputValue = (e) => {
        this.setState({
            userName: e.target.value
    });
}


    render() {
        return (
                <div>
                <List items={this.props.items} onItemClick={this.handleFormVisibility} />
                    {this.state.formVisible ? (
                        <div> Select severity of Pain
                    <br />
                            <div>{this.state.selIllness}</div> <br />
                            <div>
                                <Icon className='cellContainer' size='large' name='smile outline' id='0' onClick={this.FormHospitals}></Icon>
                                <Icon size='large' className='cellContainer' name='meh outline' id='1' onClick={this.FormHospitals} ></Icon>
                                <Icon size='large' className='cellContainer' name='meh' id='2' onClick={this.FormHospitals} ></Icon>
                                <Icon size='large' className='cellContainer' name='frown outline' id='3' onClick={this.FormHospitals}></Icon>
                                <Icon size='large' name='frown' className='cellContainer' id='4' onClick={this.FormHospitals}></Icon>
                                <br />
                            </div>
                        </div>
                    ) : null}
                
                 {this.state.showHospitals ? (
                    <List selection>
                        <label>Patient Name</label>&nbsp;<input value={this.state.userName} onChange={this.updateInputValue} />&nbsp;<button onClick={this.updatePatient}>OK</button><br />
                         Hospitals waiting time 
                            <table>{this.state.AllWaitingLists.map(item => (
                            <List.Item key={item.id}>
                                <td width='25%'>{item.Name}</td>
                                <td>{item.WaitingTime} mins</td>
                            </List.Item>
                        ))}
                        </table>
                        </List>
                ) : null}
                <div> {this.state.Patients > 1 ? (
                    <List>
                        Patients Data
                        {this.state.Patients.map(patient => (
                            <List.Item key={patient.userName}>
                                <td width='25%'>{patient.userName}</td>
                                <td width='25%'>{patient.selIllness}</td>
                                <td width='25%'>{patient.selPainLevel}</td>
                            </List.Item>
                        ))}
                    </List>
                ) : null }
                </div>
            </div>
        )
    }
}

