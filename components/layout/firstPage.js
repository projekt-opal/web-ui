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

        orderByValue: '',
        isLocationAccessDenied: false,

        latitude: 0,
        longitude: 0,

        screenWidth: 0,

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
    }

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
                    /**TODO: Fields for filters (externalLink and isTypeStatic) should be fetched from the backend. */
                    const filters = response.data.map(filterName => {
                        if (filterName.title === "Theme") {
                            filterName.externalLink = false;
                            filterName.isTypeStatic = true;

                        }
                        else {
                            filterName.externalLink = true;
                            filterName.isTypeStatic = false;
                        }
                        return filterName;
                    })
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

    fetchDataSets = () => {
        this.setState({
            loadingDataSets: true,
            loadingDataSetsError: false,
            dataSets: []
        });
        if (this.state.orderByValue !== "location") {
            this.setState({
                latitude: null,
                longitude: null
            })
        }
        else { //if orderByValue is location
            console.log(this.state.orderByValue); //should be relevance
            this.getAccessToPosition(navigator);

            //get the latitude and longitude
            console.log(this.state.latitude + " " + this.state.longitude);
        }

        /**TODO: API needs to be changed according to the value of OrderBy using 'orderByValue' */
        let url = `/dataSets/getSubList?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}`;
        //let url = `/dataSets/getSubList?searchKey=${orderByValue}&searchIn=${this.state.selectedSearchIn}`
        axios.post(url, this.state.selectedFilters)
            .then(response => {
                const dataSets = response.data;
                console.log("Response: " + dataSets);
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

    handleWindowSizeChange = () => {
        if (window.innerWidth <= 700) {
            this.getAccessToPosition(navigator);
        }
    };

    getAccessToPosition = (navigator) => {
        if (navigator && navigator.geolocation) {
            var getPosition = function (options) {
                return new Promise(function (resolve, reject) {
                    navigator.geolocation.getCurrentPosition(resolve, reject, options);
                });
            }
            getPosition()
                .then((position) => {
                    console.log("Position: " + position.coords.latitude, position.coords.longitude);
                    this.setState({
                        orderByValue: "location",
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                    this.fetchDataSets();
                })
                .catch((err) => {
                    console.log(err.message);
                    if (err.message === "User denied Geolocation") {
                        this.setState({
                            orderByValue: "relevance",
                            isLocationAccessDenied: true
                        })
                        this.fetchDataSets();
                    }
                });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

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
                        isLocationAccessDenied={this.state.isLocationAccessDenied}
                    />
                </Row>
            </Container>
        );
    }
}

export default FirstPage;