import React from 'react'
import Layout from "../../../components/layout/layout";
import {Col, Container, Row} from "reactstrap";
import axios from '../../../webservice/axios-dataSets';
import TableView from '../../../components/report/datasets/table/TableView';

class ViewOne extends React.Component {

    static getInitialProps({query}) {
        return {query};
    }

    state = {
        fieldName: null,
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
        selectedFilters: [], //is like [{title: "t", uri: "uri", values: [{value: "v1", uti:"uri_v1"}, {value:"v2", uri:"uri_v2"}]}]

        firstLoad: true
    };

    fetchDataSets = () => {
        this.setState({
            loadingDataSets: true,
            loadingDataSetsError: false,
            dataSets: []
        });
        if (this.state.firstLoad) return;
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
                    relatedDataSets: dataSets
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
        if (this.state.firstLoad) return;
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
        if (this.state.relatedDataSets !== null && this.state.relatedDataSets.length > 0) {
            let url = `/dataSets/getSubList?low=${this.state.relatedDataSets.length}`;
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
        this.getNumberOfRelatedDataSets();
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

    /**TODO: The method has to be updated accordingly w.r.t licenses */
    onFetchFilters = () => {
        this.setState({
            filters: [],
            loadingFilters: true,
            loadingFiltersError: false
        }, () => {
            axios.get(`/filters/list`)
                .then(response => {
                        const filters = response.data;
                        const selectedFilter = this.getTheQueriedFilter(filters);
                        this.setState({
                            selectedFilters: [selectedFilter],
                            firstLoad: false
                        }, () => {
                            this.setState(
                                {
                                    filters: filters,
                                    loadingFilters: false,
                                    loadingFiltersError: false
                                }, () => this.updateFilterValueCounts());
                            this.refreshDataSets();
                        })
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

    getTheQueriedFilter = (filters) => {
        if (!this.props.query || !this.props.query.uri) return;
        const uri = this.props.query.uri;


        let selectedFilter = null;
        for (let i = 0; i < filters.length; i++) {
            const values = filters[i].values;
            for (let j = 0; j < values.length; j++) {
                if (values[j].uri === uri) {
                    selectedFilter = {
                        title: filters[i].title,
                        uri: filters[i].uri,
                        values: [values[j]]
                    };
                    break;
                }
            }
        }
        return selectedFilter;
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
                        <Col md='1'></Col>
                        <Col md='10' className="border" style={{'top': '2rem'}} center>
                            <Row>
                                <Col wrapper>
                                    <h3 style={{'margin-top': '.5rem', 'margin-bottom': '0'}}>
                                        Field Name: {this.props.query.label}</h3>
                                </Col>
                            </Row>
                        </Col>
                        <Col md='1'></Col>
                    </Row>
                    <br/>
                    <Row style={{position: 'relative', top: '2rem'}}>
                        <Col md='1'></Col>
                        <Col md='10' wrapper><h4>Datasets:</h4></Col>
                        <Col md='1'></Col>
                    </Row>

                    <Row>
                        <Col md={{size: 1}}/>
                        <Col md={{size: 10}} className="border" style={{'margin-top': '2rem'}}>
                            {/* TODO: Below methods for fetching the Related Datasets by licenses */}
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
        );

    }
}

export default ViewOne;