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
        searchDTO: {
            searchKey: "",
            searchIn: [],
            orderBy: {
                selectedOrderValue: "relevance"
            },
            filters: []
        },

        dataSet: null,
        relatedDataSets: null,

        loadingDataSets: true,
        loadingDataSetsError: false,

        numberOfRelatedDataSets: 0,
        loadingNumberOfRelatedDataSets: true,
        loadingNumberOfRelatedDataSetsError: false,

        loadingFilters: true,
        loadingFiltersError: false,
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
        const searchDTO = this.prepareSearchDTO();
        axios.post(url, searchDTO)
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

    prepareSearchDTO = () => {
        const searchDTO = JSON.parse(JSON.stringify(this.state.searchDTO));
        searchDTO.filters.forEach(filter => {
            filter.values.forEach(v => {
                v.selected = v.selected.permanent;
            });
        });
        return searchDTO;
    };


    getNumberOfRelatedDataSets = () => {
        this.setState({
            loadingNumberOfRelatedDataSets: true,
            loadingNumberOfRelatedDataSetsError: false
        });
        const uri = (this.props.query && this.props.query.uri) ? this.props.query.uri : "";
        let url = `/dataSets/getNumberOfRelatedDataSets?uri=${uri}`;
        const searchDTO = this.prepareSearchDTO();
        axios.post(url, searchDTO)
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
            const searchDTO = this.prepareSearchDTO();
            axios.post(url, searchDTO)
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
        this.fetchFiltersList();
    };

    orderByChanged = (orderByValue) => {
        const searchDTO = JSON.parse(JSON.stringify(this.state.searchDTO));
        searchDTO.orderBy = orderByValue;
        this.setState({
            searchDTO: searchDTO
        }, () => this.refreshDataSets())
    };

    appendSelectedValues = (selectedFilter) => {
        console.log(selectedFilter);
        const filter = this.state.searchDTO.filters.find(f => f.filterGroupTitle === selectedFilter.filterGroupTitle);
        if (filter) {
            filter.values = filter.values.map(v => {
                v.selected.temporary = !!selectedFilter.values.find(sv => sv.value === v.value);
                return v;
            });
            const searchDTO = this.state.searchDTO;
            searchDTO.filters = searchDTO.filters.map(f => {
                if (f.filterGroupTitle === filter.filterGroupTitle) return filter;
                return f;
            });
            this.setState({searchDTO: searchDTO});
        }
    };

    fetchFiltersList = () => {
        this.setState({
            /*searchDTO: {
                filters: []
            },*/
            loadingFilters: true,
            loadingFiltersError: false
        }, () => {
            const searchDTO = this.prepareSearchDTO();
            const uri = (this.props.query && this.props.query.uri) ? this.props.query.uri : "";
            axios.post(`/filters/listFoRelated?uri=${uri}`, searchDTO)
                .then(response => {
                        const filters = response.data.map(f => {
                            f.values.forEach(v => {
                                v.selected = {
                                    permanent: !!v.selected,
                                    temporary: !!v.selected
                                };
                            });
                            return f;
                        });
                        console.log(filters);
                        this.setState(
                            {
                                searchDTO: {
                                    ...this.state.searchDTO,
                                    filters: filters
                                },
                                loadingFilters: false,
                                loadingFiltersError: false
                            });
                    }
                ).catch(error => {
                this.setState({
                    searchDTO: {
                        ...this.state.searchDTO,
                        filters: []
                    },
                    loadingFilters: false,
                    loadingFiltersError: true
                });
            });
        });
    };

    getSearchDTO = () => {
        return this.prepareSearchDTO();
    };

    applyFilters = () => {
        const searchDTO = JSON.parse(JSON.stringify(this.state.searchDTO));
        searchDTO.filters.forEach(filter => {
            filter.values.forEach(v => v.selected.permanent = v.selected.temporary)
        });
        this.setState({searchDTO: searchDTO}, this.refreshDataSets);
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
                                appendSelectedValues={(selectedFilter) => this.appendSelectedValues(selectedFilter)}
                                getSearchDTO={() => this.getSearchDTO()}
                                fetchFiltersList={() => this.fetchFiltersList()}
                                filters={this.state.searchDTO.filters}
                                loadingFilters={this.state.loadingFilters}
                                loadingFiltersError={this.state.loadingFiltersError}
                                orderByChanged={this.orderByChanged}
                                applyFilters={this.applyFilters}
                            />
                        </Col>
                    </Row>
                </Container>
            </Layout>
        )
    }
}


export default DatasetView;