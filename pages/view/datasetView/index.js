import React from 'react'
import Layout from "../../../components/layout/layout";
import {Col, Container, Row} from "reactstrap";
import {withRouter} from 'next/router'
import axios from '../../../webservice/axios-dataSets';
import DatasetViewLayout from '../../../components/layout/datasetViewLayout';
import TableView from '../../../components/report/datasets/table/TableView';

class DatasetView extends React.Component {

    static getInitialProps({query}) {
        return {query};
    }

    state = {
        dataSet: null,
        relatedDatasets: null,


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
        let url = `/dataSets/getSubList`;
        axios.post(url, {
            orderByDTO: this.state.orderByValue,
            filterDTOS: this.state.selectedFilters
        })
            .then(response => {
                const dataSets = response.data;
                console.log("Response: " + response.data);
                this.setState({
                    loadingDataSets: false,
                    loadingDataSetsError: false,
                    relatedDatasets: dataSets
                });

                console.log("response not coming")
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
        let url = `/dataSets/getNumberOfDataSets`;
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
        if (this.state.relatedDatasets !== null && this.state.relatedDatasets.length > 0) {
            let url = `/dataSets/getSubList?low=${this.state.relatedDatasets.length}`;
            axios.post(url, {
                orderByDTO: this.state.orderByValue,
                filterDTOS: this.state.selectedFilters
            })
                .then(response => {
                    const relatedDatasets = response.data;
                    let ds = [...this.state.relatedDatasets];
                    ds = ds.concat(relatedDatasets);
                    this.setState({
                        loadingDataSets: false,
                        loadingDataSetsError: false,
                        relatedDatasets: ds
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        loadingDataSets: false,
                        loadingDataSetsError: true,
                        relatedDatasets: []
                    });
                });
        }
    };

    refreshDataSets = () => {
        this.getNumberOfDataSets();
        this.fetchDataSets();
        // this.onFetchFilters();
    };

    orderByChanged = (orderByValue) => {
        this.setState({orderByValue: orderByValue}, () => this.refreshDataSets())
    };

    onAppendSelectedValues = (selectedFilter) => {
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

    onReplaceSelectedFilters = (selectedFilters) => {
        this.setState({selectedFilters: selectedFilters});
    };

    onFetchFilters = () => {
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
                            {this.state.dataSet == null ? '' : <DatasetViewLayout dataset={this.state.dataSet}/>}
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
                            {/* TODO: Below methods for fetching the Related Datasets */}
                            <TableView
                                fetchDataSets={() => this.fetchDataSets()}
                                getNumberOfDataSets={() => this.getNumberOfRelatedDataSets()}
                                load10More={() => this.load10More()}
                                dataSets={this.state.relatedDatasets}
                                numberOfDataSets={this.state.numberOfRelatedDataSets}
                                loadingNumberOfDataSets={this.state.loadingNumberOfRelatedDataSets}
                                loadingNumberOfDataSetsError={this.state.loadingNumberOfRelatedDataSetsError}
                                loadingDataSets={this.state.loadingDataSets}
                                loadingDataSetsError={this.state.loadingDataSetsError}
                                selectedFilters={this.state.selectedFilters}
                                onAppendSelectedValues={(selectedFilter) => this.onAppendSelectedValues(selectedFilter)}
                                onReplaceSelectedFilters={(selectedFilters) => this.onReplaceSelectedFilters(selectedFilters)}
                                onFetchFilters={() => this.onFetchFilters()}
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


export default withRouter(DatasetView);