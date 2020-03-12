import React from 'react';
import SearchBar from "../search/SearchBar";
import TableView from "../report/datasets/table/TableView";
import {Container, Row} from "reactstrap";
import axios from "../../../webservice/axios-dataSets";

class FirstPage extends React.Component {

    state = {
        searchDTO: {
            searchKey: "",
            searchIn: [],
            orderBy: {
                selectedOrderValue: "relevance"
            },
            filters: []
        },
        searchKey: '',
        selectedSearchIn: [],
        lastSelectedSearchIn: [],

        screenWidth: 0,

        orderByValue: null,

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

    componentDidMount = () => {
        this.handleWindowSizeChange();
        window.addEventListener('resize', this.handleWindowSizeChange);
    };

    setLastSelectedSearchIn = () => {
        this.setState({lastSelectedSearchIn: this.state.selectedSearchIn});
    };

    onUpdateSearchKey = (searchKey) => {
        this.setState({searchKey: searchKey})
    };

    onSearchInChanged = (searchDomain) => {
        let newSelectedSearchIn = [...this.state.selectedSearchIn];
        if (newSelectedSearchIn.includes(searchDomain))
            newSelectedSearchIn = newSelectedSearchIn.filter(x => x !== searchDomain);
        else
            newSelectedSearchIn = newSelectedSearchIn.concat(searchDomain);
        this.setState({selectedSearchIn: newSelectedSearchIn});
    };

    onUpdatedSearchInRemoved = (searchDomain) => {
        let newSelectedSearchIn = [...this.state.selectedSearchIn];
        newSelectedSearchIn = newSelectedSearchIn.filter(x => x !== searchDomain);
        this.setState({selectedSearchIn: newSelectedSearchIn});
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
            axios.post(`/filters/list`, searchDTO)
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
                            }, () => console.log(this.state.searchDTO));
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

    prepareSearchDTO = () => {
        const searchDTO = JSON.parse(JSON.stringify(this.state.searchDTO));
        searchDTO.filters.forEach(filter => {
            filter.values.forEach(v => {
                v.selected = v.selected.permanent;
            });
        });
        return searchDTO;
    };

    replaceSelectedFilters = (selectedFilters) => {
        this.setState({selectedFilters: selectedFilters});
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

    getSearchKey = () => {
        return this.state.searchKey;
    };

    // todo change post opbject
    load10More = () => {
        if (this.state.dataSets !== null && this.state.dataSets.length > 0) {
            let url = `/dataSets/getSubList?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}&low=${this.state.dataSets.length}`;
            axios.post(url, {
                orderByDTO: this.state.orderByValue,
                filterDTOS: this.state.selectedFilters
            })
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

    getNumberOfDataSets = () => {
        this.setState({
            loadingNumberOfDataSets: true,
            loadingNumberOfDataSetsError: false
        });
        let url = `/dataSets/getNumberOfDataSets`;
        // todo handle timeout https://stackoverflow.com/questions/36690451/timeout-feature-in-the-axios-library-is-not-working
        const searchDTO = this.prepareSearchDTO();
        axios.post(url, searchDTO)
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

    fetchDataSets = () => {
        this.setState({
            loadingDataSets: true,
            loadingDataSetsError: false,
            dataSets: []
        });


        let url = `/dataSets/getSubList`;
        const searchDTO = this.prepareSearchDTO();
        axios.post(url, searchDTO)
            .then(response => {
                const dataSets = response.data;
                this.setState({
                    loadingDataSets: false,
                    loadingDataSetsError: false,
                    dataSets: dataSets
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

    refreshDataSets = () => {
        this.getNumberOfDataSets();
        this.fetchDataSets();
        this.fetchFiltersList();
    };

    orderByChanged = (orderByValue) => {
        this.setState({orderByValue: orderByValue}, () => this.refreshDataSets())
    };

    getSelectedSearchIn = () => {
        return this.state.selectedSearchIn;
    };

    handleWindowSizeChange = () => {
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    applyFilters = () => {
        const searchDTO = JSON.parse(JSON.stringify(this.state.searchDTO));
        searchDTO.filters.forEach(filter => {
            filter.values.forEach(v => v.selected.permanent = v.selected.temporary)
        });
        this.setState({searchDTO: searchDTO}, this.refreshDataSets);
    };

    render() {
        return (
            <Container fluid>
                <br/>
                <Row>
                    <SearchBar
                        onFetchingDataSets={() => this.fetchDataSets()}
                        onGettingNumberOfDataSets={() => this.getNumberOfDataSets()}
                        onUpdatedSearchInRemoved={(domain) => this.onUpdatedSearchInRemoved(domain)}
                        onSearchInChanged={(domain) => this.onSearchInChanged(domain)}
                        onUpdateSearchKey={(searchKey) => this.onUpdateSearchKey(searchKey)}
                        selectedSearchIn={this.state.selectedSearchIn}
                        setLastSelectedSearchIn={() => this.setLastSelectedSearchIn()}
                        onFetchFilters={() => this.fetchFiltersList()}
                    />
                </Row>
                <br/>
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
                        appendSelectedValues={(selectedFilter) => this.appendSelectedValues(selectedFilter)}
                        getSearchKey={() => this.getSearchKey()}
                        replaceSelectedFilters={(selectedFilters) => this.replaceSelectedFilters(selectedFilters)}
                        selectedSearchIn={this.state.lastSelectedSearchIn}
                        fetchFiltersList={() => this.fetchFiltersList()}
                        filters={this.state.searchDTO.filters}
                        loadingFilters={this.state.loadingFilters}
                        loadingFiltersError={this.state.loadingFiltersError}
                        getSelectedSearchIn={() => this.getSelectedSearchIn()}
                        isLocationAccessDenied={this.state.isLocationAccessDenied}
                        orderByChanged={this.orderByChanged}
                        applyFilters={this.applyFilters}
                    />
                </Row>
            </Container>
        );
    }
}

export default FirstPage;