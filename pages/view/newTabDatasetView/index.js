import React from 'react'
import Layout from "../../../components/layout/layout";
import {
    Container,
    Row,
    Col
} from "reactstrap";
import { withRouter } from 'next/router'
import axios from '../../../webservice/axios-dataSets';
import DatasetView from '../../../components/layout/datasetView';

class NewTabDatasetView extends React.Component {
    state = {
        dataSet: null
    };

    componentDidMount() {
        const datasetUri = window.localStorage.getItem("DATASET_URI");
        axios.get("/dataSet?uri=" + datasetUri)
            .then(response => {
                console.log(response.data);
                if (response.data != null) {
                    this.setState({ dataSet: response.data })

                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { router } = this.props;
        return (
            <Layout>
                <Container>
                    <Row>
                        <Col md={{ size: 2 }}></Col>
                        <Col md={{ size: 8 }} className="border" style={{ 'top': '2rem' }}>
                            {this.state.dataSet == null ? '' : <DatasetView dataset={this.state.dataSet} />}
                        </Col>
                        <Col md={{ size: 2 }}></Col>
                    </Row>
                </Container>
            </Layout >

        )
    }

}


export default withRouter(NewTabDatasetView);