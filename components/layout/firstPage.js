import React from 'react';
import SearchBar from "../search/SearchBar";
import TableView from "../report/datasets/table/TableView";
import { Container, Row } from "reactstrap";
import axios from "../../webservice/axios-dataSets";
import CustomSelect from "../report/datasets/filter/customSelect";

class FirstPage extends React.Component {

    state = {
        searchKey: '',
        selectedSearchIn: [],
        lastSelectedSearchIn: [],

        dataSets: [],
        loadingDataSets: true,
        loadingDataSetsError: false,

        numberOfDataSets: 0,
        loadingNumberOfDataSets: true,
        loadingNumberOfDataSetsError: false,

        filters: [],//[{title: t1, uri:"filter uri" values: [{label: l, value: v, uri: u},{...},...]
        loadingFilters: true,
        loadingFiltersError: false,
        selectedFilters: [] //is like [{title: "t", uri: "uri", values: [{value: "v1", uti:"uri_v1"}, {value:"v2", uri:"uri_v2"}]}]
    };

    setLastSelectedSearchIn = () => {
        this.setState({ lastSelectedSearchIn: this.state.selectedSearchIn });
    };

    onUpdateSearchKey = (searchKey) => {
        this.setState({ searchKey: searchKey })
    };

    onSearchInChanged = (searchDomain) => {
        let newSelectedSearchIn = [...this.state.selectedSearchIn];
        if (newSelectedSearchIn.includes(searchDomain))
            newSelectedSearchIn = newSelectedSearchIn.filter(x => x !== searchDomain);
        else
            newSelectedSearchIn = newSelectedSearchIn.concat(searchDomain);
        this.setState({ selectedSearchIn: newSelectedSearchIn });
    };

    onUpdatedSearchInRemoved = (searchDomain) => {
        let newSelectedSearchIn = [...this.state.selectedSearchIn];
        newSelectedSearchIn = newSelectedSearchIn.filter(x => x !== searchDomain);
        this.setState({ selectedSearchIn: newSelectedSearchIn });
    };

    onFetchFilters = () => {
        this.setState({
            filters: [],
            loadingFilters: true,
            loadingFiltersError: false
        }, () => {
            axios.get(`/filters/list?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}`)
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
                    axios.post(`/filter/count?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}`,
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
        this.setState({ filters: filters });
    };

    onReplaceSelectedFilters = (selectedFilters) => {
        this.setState({ selectedFilters: selectedFilters });
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

        this.setState({ selectedFilters: selectedFilters });
    };

    onGetSearchKey = () => {
        return this.state.searchKey;
    };

    load10More = () => {
        if (this.state.dataSets !== null && this.state.dataSets.length > 0) {
            let url = `/dataSets/getSubList?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}&low=${this.state.dataSets.length}`;
            axios.post(url, this.state.selectedFilters)
                .then(response => {
                    const dataSets = response.data;
                    let ds = [...this.state.dataSets];
                    ds = ds.concat(dataSets);
                    this.setState({
                        loadingDataSets: false,
                        loadingDataSetsError: false,
                        dataSets: ds
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
        }
    };

    getNumberOfDataSets = (/*todo orderBy, */) => {
        this.setState({
            loadingNumberOfDataSets: true,
            loadingNumberOfDataSetsError: false
        });
        let url = `/dataSets/getNumberOfDataSets?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}`;
        axios.post(url, this.state.selectedFilters)
            .then(response => {
                const numberOfDataSets = response.data;
                this.setState({
                    loadingNumberOfDataSets: false,
                    loadingNumberOfDataSetsError: false,
                    numberOfDataSets: numberOfDataSets
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loadingNumberOfDataSets: false,
                    loadingNumberOfDataSetsError: true,
                    numberOfDataSets: -1
                });
            });
    };

    fetchDataSets = (/*todo orderBy, */) => {
        this.setState({
            loadingDataSets: true,
            loadingDataSetsError: false,
            dataSets: []
        });
        let url = `/dataSets/getSubList?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}`;
        axios.post(url, this.state.selectedFilters)
            .then(response => {
                const dataSets = response.data;
                console.log("Response: " + response.data);
                this.setState({
                    loadingDataSets: false,
                    loadingDataSetsError: false,
                    dataSets: dataSets
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

    getSelectedSearchIn = () => {
        return this.state.selectedSearchIn;
    };

    render() {
        return (
            <Container fluid>
                <br />
                <Row>
                    <SearchBar
                        onFetchingDataSets={() => this.fetchDataSets()}
                        onGettingNumberOfDataSets={() => this.getNumberOfDataSets()}
                        onUpdatedSearchInRemoved={(domain) => this.onUpdatedSearchInRemoved(domain)}
                        onSearchInChanged={(domain) => this.onSearchInChanged(domain)}
                        onUpdateSearchKey={(searchKey) => this.onUpdateSearchKey(searchKey)}
                        selectedSearchIn={this.state.selectedSearchIn}
                        setLastSelectedSearchIn={() => this.setLastSelectedSearchIn()}
                        onFetchFilters={() => this.onFetchFilters()}
                    />
                </Row>
                <br />
                <Row>
                    <TableView
                        fetchDataSets={() => this.fetchDataSets()}
                        getNumberOfDataSets={() => this.getNumberOfDataSets()}
                        load10More={() => this.load10More()}
                        dataSets={this.state.dataSets}
                        numberOfDataSets={this.state.numberOfDataSets}
                        loadingNumberOfDataSets={this.state.loadingNumberOfDataSets}
                        loadingNumberOfDataSetsError={this.state.loadingNumberOfDataSetsError}
                        loadingDataSets={this.state.loadingDataSets}
                        loadingDataSetsError={this.state.loadingDataSetsError}
                        selectedFilters={this.state.selectedFilters}
                        onAppendSelectedValues={(selectedFilter) => this.onAppendSelectedValues(selectedFilter)}
                        onGetSearchKey={() => this.onGetSearchKey()}
                        onReplaceSelectedFilters={(selectedFilters) => this.onReplaceSelectedFilters(selectedFilters)}
                        selectedSearchIn={this.state.lastSelectedSearchIn}
                        onFetchFilters={() => this.onFetchFilters()}
                        filters={this.state.filters}
                        loadingFilters={this.state.loadingFilters}
                        loadingFiltersError={this.state.loadingFiltersError}
                        getSelectedSearchIn={() => this.getSelectedSearchIn()}
                    />
                </Row>
            </Container>
        );
    }
}

export default FirstPage;