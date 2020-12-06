import React from 'react'
import Layout from "../../../components/layout/layout";
import {Col, Container, Row} from "reactstrap";
import axios from '../../../../webservice/axios-dataSets';
import HistroyLayout from '../../../components/layout/HistoryLayout';
import TableView from '../../../components/report/datasets/table/TableView';

class HistoryView extends React.Component {

    static getInitialProps({query}) {
        return {query};
    }

    state = {
        dataSet: null,
        removedTriples: null,
        addedTriples: null
    };

    componentDidMount() {
        if (this.props.query && this.props.query.uri) {
            const datasetUri = this.props.query.uri;
            axios.get("/dataSet?uri=" + datasetUri)
                .then(response => {
                    if (response.data != null) {
                        this.setState({dataSet: response.data})
                    }
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <Layout>
                <Container fluid>
                    <Row>
                        <Col md='1'/>
                        <Col md='10' className="border" style={{marginTop: '2em'}}>
                            {this.state.dataSet === null ? '' : <HistroyLayout dataSet={this.state.dataSet}/>}
                        </Col>
                        <Col md='1'/>
                    </Row>
                </Container>
            </Layout>
        )
    }
}


export default HistoryView;
