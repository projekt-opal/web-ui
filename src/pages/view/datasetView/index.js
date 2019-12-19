import React from 'react'
import Layout from "../../../components/layout/layout";
import {Col, Container, Row} from "reactstrap";
import axios from '../../../../webservice/axios-dataSets';
import DatasetViewLayout from '../../../components/layout/datasetViewLayout';
import TableView from '../../../components/report/datasets/table/TableView';

class DatasetView extends React.Component {

    static getInitialProps({query}) {
        return {query};
    }

    state = {
        dataSet: null,
        relatedDataSets: null,


        orderByValue: null,

        loadingDataSets: true,
        loadingDataSetsError: false,

        numberOfRelatedDataSets: 0,
        loadingNumberOfRelatedDataSets: true,
        loadingNumberOfRelatedDataSetsError: false,

        filters: [],//[{title: t1, uri:"filter uri" values: [{label: l, value: v, uri: u},{...},...]
        loadingFilters: true,
        loadingFiltersError: false,
        selectedFilters: [] //is like [{title: "t", uri: "uri", values: [{value: "v1", uti:"uri_v1"}, {value:"v2", uri:"uri_v2"}]}]
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

    fetchDataSets = () => {
        this.setState({
            loadingDataSets: true,
            loadingDataSetsError: false,
            dataSets: []
        });
        const uri = (this.props.query && this.props.query.uri) ? this.props.query.uri : "";
        let url = `/dataSets/getRelatedSubList?uri=${uri}`;
        axios.post(url, {
            orderByDTO: this.state.orderByValue,
            filterDTOS: this.state.selectedFilters
        })
            .then(response => {
                const dataSets = response.data;
                this.setState({
                    loadingDataSets: false,
                    loadingDataSetsError: false,
                    relatedDataSets: dataSets
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loadingDataSets: false,
                    loadingDataSetsError: true,
                    dataSets: []
                });
            });
    };

    getNumberOfRelatedDataSets = () => {
        this.setState({
            loadingNumberOfRelatedDataSets: true,
            loadingNumberOfRelatedDataSetsError: false
        });
        const uri = (this.props.query && this.props.query.uri) ? this.props.query.uri : "";
        let url = `/dataSets/getNumberOfRelatedDataSets?uri=${uri}`;
        axios.post(url, {
            orderByDTO: this.state.orderByValue,
            filterDTOS: this.state.selectedFilters
        })
            .then(response => {
                const numberOfRelatedDataSets = response.data;
                this.setState({
                    loadingNumberOfRelatedDataSets: false,
                    loadingNumberOfRelatedDataSetsError: false,
                    numberOfRelatedDataSets: numberOfRelatedDataSets
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loadingNumberOfRelatedDataSets: false,
                    loadingNumberOfRelatedDataSetsError: true,
                    numberOfRelatedDataSets: -1
                });
            });
    };

    load10More = () => {
        const uri = (this.props.query && this.props.query.uri) ? this.props.query.uri : "";
        if (this.state.relatedDataSets !== null && this.state.relatedDataSets.length > 0) {
            let url = `/dataSets/getRelatedSubList?uri=${uri}&low=${this.state.relatedDataSets.length}`;
            axios.post(url, {
                orderByDTO: this.state.orderByValue,
                filterDTOS: this.state.selectedFilters
            })
                .then(response => {
                    const relatedDataSets = response.data;
                    let ds = [...this.state.relatedDataSets];
                    ds = ds.concat(relatedDataSets);
                    this.setState({
                        loadingDataSets: false,
                        loadingDataSetsError: false,
                        relatedDataSets: ds
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        loadingDataSets: false,
                        loadingDataSetsError: true,
                        relatedDataSets: []
                    });
                });
        }
    };

    refreshDataSets = () => {
        this.getNumberOfDataSets();
        this.fetchDataSets();
        // this.fetchFiltersList();
    };

    orderByChanged = (orderByValue) => {
        this.setState({orderByValue: orderByValue}, () => this.refreshDataSets())
    };

    appendSelectedValues = (selectedFilter) => {
        let selectedFilters = [...this.state.selectedFilters];

        const prevSelectedFilter = selectedFilters.find(f => f.title === selectedFilter.title);
        if (prevSelectedFilter)
            if (selectedFilter.values.length === 0)
                selectedFilters = selectedFilters.filter(f => f.title !== selectedFilter.title);
            else
                prevSelectedFilter.values = selectedFilter.values;
        else
            selectedFilters.push(selectedFilter);

        this.setState({selectedFilters: selectedFilters});
    };

    replaceSelectedFilters = (selectedFilters) => {
        this.setState({selectedFilters: selectedFilters});
    };

    fetchFiltersList = () => {
        this.setState({
            filters: [],
            loadingFilters: true,
            loadingFiltersError: false
        }, () => {
            axios.get(`/filters/list`)
                .then(response => {
                        const filters = response.data;
                        this.setState(
                            {
                                filters: filters,
                                loadingFilters: false,
                                loadingFiltersError: false
                            }, () => this.updateFilterValueCounts());
                    }
                ).catch(error => {
                this.setState({
                    filters: [],
                    loadingFilters: false,
                    loadingFiltersError: true
                });
            });
        });
    };

    updateFilterValueCounts = () => {
        const filters = [...this.state.filters];
        filters.forEach(f => {
            f.values.forEach(v => {
                if (v.count === -1) {
                    const searchKey="";
                    const selectedSearchIn=[];
                    axios.post(`/filter/count?searchKey=${searchKey}&searchIn=${selectedSearchIn}`,
                        {
                            filterUri: f.uri,
                            valueUri: v.uri
                        })
                        .then(response => {
                            v.count = response.data;
                        })
                        .catch(err => console.log(err));
                }
            });
        });
        this.setState({filters: filters});
    };

    render() {
        return (
            <Layout>
                <Container fluid>
                    <Row>
                        <Col md='1'/>
                        <Col md='10' className="border" style={{marginTop: '2em'}}>
                            {this.state.dataSet === null ? '' : <DatasetViewLayout dataSet={this.state.dataSet}/>}
                        </Col>
                        <Col md='1'/>
                    </Row>
                    <br/>
                    <Row style={{position: 'relative', marginTop: '2em'}}>
                        <Col md='1'/>
                        <Col md='10'><h4>Related DataSets:</h4></Col>
                        <Col md='1'/>
                    </Row>


                    <Row>
                        <Col md={{size: 1}}/>
                        <Col md={{size: 10}} className="border" style={{marginTop: '2rem'}}>
                            <TableView
                                fetchDataSets={() => this.fetchDataSets()}
                                getNumberOfDataSets={() => this.getNumberOfRelatedDataSets()}
                                load10More={() => this.load10More()}
                                dataSets={this.state.relatedDataSets}
                                numberOfDataSets={this.state.numberOfRelatedDataSets}
                                loadingNumberOfDataSets={this.state.loadingNumberOfRelatedDataSets}
                                loadingNumberOfDataSetsError={this.state.loadingNumberOfRelatedDataSetsError}
                                loadingDataSets={this.state.loadingDataSets}
                                loadingDataSetsError={this.state.loadingDataSetsError}
                                selectedFilters={this.state.selectedFilters}
                                appendSelectedValues={(selectedFilter) => this.appendSelectedValues(selectedFilter)}
                                replaceSelectedFilters={(selectedFilters) => this.replaceSelectedFilters(selectedFilters)}
                                fetchFiltersList={() => this.fetchFiltersList()}
                                filters={this.state.filters}
                                loadingFilters={this.state.loadingFilters}
                                loadingFiltersError={this.state.loadingFiltersError}
                                orderByChanged={this.orderByChanged}
                            />
                        </Col>
                    </Row>
                </Container>
            </Layout>
        )
    }
}


export default DatasetView;