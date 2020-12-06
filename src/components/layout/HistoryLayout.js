import React from 'react';
import { Badge, Button, Col, Collapse, Container, Row, Table } from "reactstrap";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';
import {WEBSERVICE_URL} from '../../../webservice/webservice-url';

class HistroyLayout extends React.Component {

    state = {
        removedTriples: null,
        addedTriples: null,
        dataAvailable: false
    };

    getChanges = (obj) => {
    const requestOptions = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'}),
        body: "uri=" + this.props.dataSet.uri
    };
    fetch(WEBSERVICE_URL + "dataSets/getChanges", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
                removedTriples: result.removedTriples,
                addedTriples: result.addedTriples,
                dataAvailable: true
            });
        }
      )
    }

    getTitle() {
        return this.props.dataSet.title ? this.props.dataSet.title : this.props.dataSet.title_de;
    }

    getRemoved = () =>{
        if(this.state.removedTriples == null)
            return '';

        let data = '';
        for (var i = 0; i < this.state.removedTriples.length; ++i) {
            data += this.state.removedTriples[i] + "\n";
        }
        return data;
    }

    getAdded = () =>{
        if(this.state.removedTriples == null)
            return '';

        let data = '';
        for (var i = 0; i < this.state.addedTriples.length; ++i) {
            data += this.state.addedTriples[i] + "\n";
        }
        return data;
    }

    render() {

        if(!this.state.dataAvailable)
            this.getChanges(this);

        return (
            <Container fluid>
             <Row>
                <Col>
                    <h3 style={{ marginTop: '.5rem', marginBottom: '0' }}>Dataset history</h3>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h4 style={{ marginTop: '.5rem', marginBottom: '0' }}>
                            {this.props.dataSet == null ? '' : this.getTitle()}
                    </h4>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h5 style={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
                        Added triples
                    </h5>
                    <pre>{this.getAdded()}</pre>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h5 style={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
                        Removed triples
                    </h5>
                    <pre>{this.getRemoved()}</pre>
                </Col>
            </Row>

            </Container >
        );
    }

}

export default HistroyLayout;
