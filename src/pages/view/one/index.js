import React from 'react'
import Layout from "../../../components/layout/layout";
import {Col, Container, Row} from "reactstrap";
import axios from '../../../../webservice/axios-dataSets';
import TableView from '../../../components/report/datasets/table/TableView';

class ViewOne extends React.Component {

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

        fieldName: null,
        relatedDataSets: null,

        loadingDataSets: true,
        loadingDataSetsError: false,

        numberOfRelatedDataSets: 0,
        loadingNumberOfRelatedDataSets: true,
        loadingNumberOfRelatedDataSetsError: false,

        loadingFilters: true,
        loadingFiltersError: false,

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
        const searchDTO = this.prepareSearchDTO();
        axios.post(url, searchDTO)
            .then(response => {
                const dataSets = response.data;
                console.log("Response: " + response.data);
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
        if (this.state.firstLoad) return;
        let url = `/dataSets/getNumberOfDataSets`;
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
        if (this.state.relatedDataSets !== null && this.state.relatedDataSets.length > 0) {
            let url = `/dataSets/getSubList?low=${this.state.relatedDataSets.length}`;
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
            loadingFilters: true,
            loadingFiltersError: false
        }, () => {
            const searchDTO = this.prepareSearchDTO();
            axios.post(`/filters/list`, searchDTO)
                .then(response => {
                        const label = !this.props.query || !this.props.query.label ? '' : this.props.query.label;
                        const filters = response.data.map(f => {
                            f.values.forEach(v => {
                                v.selected = {
                                    permanent: !!v.selected,
                                    temporary: !!v.selected
                                };
                                if (v.value === label)
                                    v.selected.permanent = true;
                            });
                            return f;
                        });
                        const firstLoad = this.state.firstLoad;
                        this.setState(
                            {
                                searchDTO: {
                                    ...this.state.searchDTO,
                                    filters: filters
                                },
                                loadingFilters: false,
                                loadingFiltersError: false,
                                firstLoad: false
                            }, () => {
                                if (firstLoad)
                                    this.refreshDataSets();
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

    applyFilters = () => {
        const searchDTO = JSON.parse(JSON.stringify(this.state.searchDTO));
        searchDTO.filters.forEach(filter => {
            filter.values.forEach(v => v.selected.permanent = v.selected.temporary)
        });
        this.setState({searchDTO: searchDTO}, this.refreshDataSets);
    };

    getSearchDTO = () => {
        return this.prepareSearchDTO();
    };

    render() {
        return (
            <Layout>
                <Container fluid>
                    <Row>
                        <Col md='1'></Col>
                        <Col md='10' style={{'top': '2rem'}}>
                            <Row>
                                <Col>
                                    <h3 className='mt-2 mb-4'>{this.props.query.label}</h3>
                                </Col>
                            </Row>
                        </Col>
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
                                getSearchDTO={this.getSearchDTO}
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
        );

    }
}

export default ViewOne;
