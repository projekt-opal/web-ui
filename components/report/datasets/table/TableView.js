import React from 'react';
import {Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Spinner, Table} from "reactstrap";
import {FaRedo, FaThLarge, FaThList} from "react-icons/fa";
import ShortView from "../dataset/ShortView";
import LongView from "../dataset/LongView";
import FiltersView from '../filter/FiltersView';

import {connect} from 'react-redux';

import axios from '../../../../webservice/axios-dataSets';

class TableView extends React.Component {

    state = {
        dropdownOpen: false,

        listOrderByValues: ['title', 'issue date', 'theme'],
        selectedOrder: 0,

        isLongView: true,

        isTooltipNumberOfDataSetsOpen: false,
        isTooltipDataSetsOpen: false,

        screenWidth: 0,

        dataSets: [],
        loadingDataSets: true,
        loadingDataSetsError: false,

        numberOfDataSets: 0,
        loadingNumberOfDataSets: true,
        loadingNumberOfDataSetsError: false,

        filters: [],//[{title: t1, values: [{label: l, value: v, uri: u}]},{...},...]
        selectedFilters: [], //is like [{title: "t", uri: "uri", values: [{value: "v1", uti:"uri_v1"}, {value:"v2", uri:"uri_v2"}]}]
        isFiltersOpen: true
    };

    async componentDidMount() {
        this.fetchDataSets(this.props.searchKey, this.props.selectedSearchIn, this.state.selectedFilters);
        this.getNumberOfDataSets(this.props.searchKey, this.props.selectedSearchIn, this.state.selectedFilters);
        await this.onFetchFilters();
        this.handleWindowSizeChange();
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    onFetchFilters = () => {
        axios.get('/filters/list')
            .then(response => {
                    console.log(response);
                    // const data = response.data;
                    const data = [
                        {
                            title: "t1",
                            values: [
                                {label: "label_t1_11", value: "label_t1_v1", uri: "label_t1_uri1"},
                                {label: "label_t1_12", value: "label_t1_v2", uri: "label_t1_uri2"},
                                {label: "label_t1_13", value: "label_t1_v3", uri: "label_t1_uri3"}
                            ]

                        }, {
                            title: "t2",
                            values: [
                                {label: "label_t2_11", value: "label_t2_v1", uri: "label_t2_uri1"},
                                {label: "label_t2_12", value: "label_t2_v2", uri: "label_t2_uri2"},
                                {label: "label_t2_13", value: "label_t2_v3", uri: "label_t2_uri3"}
                            ]

                        }, {
                            title: "t3",
                            values: [
                                {label: "label_t3_11", value: "label_t3_v1", uri: "label_t3_uri1"},
                                {label: "label_t3_12", value: "label_t3_v2", uri: "label_t3_uri2"},
                                {label: "label_t3_13", value: "label_t3_v3", uri: "label_t3_uri3"}
                            ]

                        },
                    ];
                    this.setState({filters: data});
                }
            ).catch(error => console.log(error));
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

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    orderByChanged = (idx) => {
        let newState = {...this.state};
        newState.selectedOrder = idx;
        this.setState(newState);
    };

    largeViewChanged = () => {
        let newState = {...this.state};
        newState.isLongView = !newState.isLongView;
        this.setState(newState);
    };

    load10More = () => {
        if (this.state.dataSets !== null && this.state.dataSets.length > 0)
            onLoad10More(this.props.searchKey, this.props.selectedSearchIn, this.state.dataSets.length, this.state.selectedFilters);
    };

    applyFilters = () => {
        this.fetchDataSets(this.props.searchKey, this.props.selectedSearchIn, this.state.selectedFilters);
        this.getNumberOfDataSets(this.props.searchKey, this.props.selectedSearchIn, this.state.selectedFilters);
    };

    reloadNumberOfDataSets = () => {
        this.setState({
            isTooltipNumberOfDataSetsOpen: false
        });
        this.getNumberOfDataSets(this.props.searchKey, this.props.selectedSearchIn, this.state.selectedFilters);

    };

    reloadDataSets = () => {
        this.setState({
            isTooltipDataSetsOpen: false
        });
        this.fetchDataSets(this.props.searchKey, this.props.selectedSearchIn, this.state.selectedFilters);
    };


    toggleToolTipNumberOfDataSets = () => {
        this.setState({
            isTooltipNumberOfDataSetsOpen: !this.state.isTooltipNumberOfDataSetsOpen
        });
    };

    toggleToolTipDataSets = () => {
        this.setState({
            isTooltipDataSetsOpen: !this.state.isTooltipDataSetsOpen
        });
    };

    toggleFilters = () => {
        this.setState({isFiltersOpen: !this.state.isFiltersOpen});
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({screenWidth: window.innerWidth});
    };

    getNumberOfDataSets = (searchKey, searchIn, /*todo orderBy, */selectedFilters) => {
        this.setState({
            loadingNumberOfDataSets: true,
            loadingNumberOfDataSetsError: false
        });
        const numberOfDataSets = 79423;
        this.setState({
            loadingNumberOfDataSets: false,
            loadingNumberOfDataSetsError: false,
            numberOfDataSets: numberOfDataSets
        });

        // dispatch(getNumberOfDataSetsSuccess(numberOfDataSets));
        // axios.post(`/dataSets/getNumberOfDataSets?searchQuery=${searchKey}&searchIn=${searchIn}`, selectedFilters)
        //     .then( response => {
        //         const numberOfDataSets = response.data;
        // this.setState({
        //     loadingNumberOfDataSets: false,
        //     loadingNumberOfDataSetsError: false,
        //     numberOfDataSets: numberOfDataSets
        // });
        //     } )
        //     .catch( err => {
        // this.setState({
        //     loadingNumberOfDataSets: false,
        //     loadingNumberOfDataSetsError: true,
        //     numberOfDataSets: -1
        // });
        //     } );
    };

    fetchDataSets = (searchKey, searchIn, /*todo orderBy, */selectedFilters) => {
        this.setState({
            loadingDataSets: true,
            loadingDataSetsError: false,
            dataSets: []
        });
        const dataSets = [
            {
                catalog: "http://projekt-opal.de/catalog/mcloud",
                description: "0Die Raster wurden aus aus den jährlichen Rastern des Vegetationsbeginns gemittelt. Der Vegetationsbeginn wird über die phänologische Phase Forsythie - Beginn der Blüte festgelegt und kennzeichnet den Beginn des Erstfrühlings. Weitere Informationen: https://opendata.dwd.de/climate_environment/CDC/grids_germany/multi_annual/vegetation_begin/BESCHREIBUNG_gridsgermany_multi_annual_vegetation_begin_de.pdf",
                fileType: "PDF",
                issueDate: "2018-12-05",
                keywords: ["key1", "key2"],
                overallRating: "3.648858349950768",
                theme: "http://projeckt-opal.de/theme/mcloud/climateAndWeather",
                title: "Vieljährliche Raster des mittleren Vegetationsbeginns in Deutschland",
                uri: "http://projekt-opal.de/dataset/_mcloudde_vieljhrlicherasterdesmittlerenvegetationsbeginnsindeutschland_0",

                dataFiles: {
                    name: "NAME",
                    publisher: "PUBLISHER",
                    links: [
                        {
                            fileType: "PDF",
                            link: "https://www.govdata.de/ckan/dataset/windkraftanlagen-im-genehmigungsverfahren.rdf",
                        },
                        {
                            fileType: "CSV",
                            link: "http://185.223.104.6/data/llur72/genehmigungsverfahren.csv",
                        },
                    ],
                },
                metadataInfo:
                    {
                        "Letzte Änderung": "15.08.2019",
                        "Veröffentlichungsdatum": "01.07.2019",
                        "Zeitraum": "01.07.2019 - 01.07.2019"
                    },
                qualityMetrics:
                    {
                        "score1": 1,
                        "score2": 0,
                        "score3": 4.5,
                    }
            }, {
                catalog: "http://projekt-opal.de/catalog/mcloud",
                description: "1Die Raster wurden aus aus den jährlichen Rastern des Vegetationsbeginns gemittelt. Der Vegetationsbeginn wird über die phänologische Phase Forsythie - Beginn der Blüte festgelegt und kennzeichnet den Beginn des Erstfrühlings. Weitere Informationen: https://opendata.dwd.de/climate_environment/CDC/grids_germany/multi_annual/vegetation_begin/BESCHREIBUNG_gridsgermany_multi_annual_vegetation_begin_de.pdf",
                fileType: "PDF",
                issueDate: "2018-12-05",
                keywords: ["key1", "key2"],
                overallRating: "3.648858349950768",
                theme: "http://projeckt-opal.de/theme/mcloud/climateAndWeather",
                title: "Vieljährliche Raster des mittleren Vegetationsbeginns in Deutschland",
                uri: "http://projekt-opal.de/dataset/_mcloudde_vieljhrlicherasterdesmittlerenvegetationsbeginnsindeutschland_1",

                dataFiles: {
                    name: "Lana",
                    publisher: "DS group",
                    links: [
                        {
                            fileType: "PDF",
                            link: "https://www.govdata.de/ckan/dataset/windkraftanlagen-im-genehmigungsverfahren.rdf",
                        },
                        {
                            fileType: "CSV",
                            link: "http://185.223.104.6/data/llur72/genehmigungsverfahren.csv",
                        },
                    ],
                },
                metadataInfo:
                    {
                        "Letzte Änderung": "15.08.2019",
                        "Veröffentlichungsdatum": "01.07.2019",
                        "Zeitraum": "01.07.2019 - 01.07.2019"
                    },
                qualityMetrics:
                    {
                        "score1": 5,
                        "score2": 4,
                        "score3": 1,
                    }
            }, {
                catalog: "http://projekt-opal.de/catalog/mcloud",
                description: "2Die Raster wurden aus aus den jährlichen Rastern des Vegetationsbeginns gemittelt. Der Vegetationsbeginn wird über die phänologische Phase Forsythie - Beginn der Blüte festgelegt und kennzeichnet den Beginn des Erstfrühlings. Weitere Informationen: https://opendata.dwd.de/climate_environment/CDC/grids_germany/multi_annual/vegetation_begin/BESCHREIBUNG_gridsgermany_multi_annual_vegetation_begin_de.pdf",
                fileType: "PDF",
                issueDate: "2018-12-05",
                keywords: ["key1", "key2"],
                overallRating: "3.648858349950768",
                theme: "http://projeckt-opal.de/theme/mcloud/climateAndWeather",
                title: "Vieljährliche Raster des mittleren Vegetationsbeginns in Deutschland",
                uri: "http://projekt-opal.de/dataset/_mcloudde_vieljhrlicherasterdesmittlerenvegetationsbeginnsindeutschland_2",

                dataFiles: {
                    name: "NAME",
                    publisher: "PUBLISHER",
                    links: [
                        {
                            fileType: "PDF",
                            link: "https://www.govdata.de/ckan/dataset/windkraftanlagen-im-genehmigungsverfahren.rdf",
                        },
                        {
                            fileType: "CSV",
                            link: "http://185.223.104.6/data/llur72/genehmigungsverfahren.csv",
                        },
                    ],
                },
                metadataInfo:
                    {
                        "Letzte Änderung": "15.08.2019",
                        "Veröffentlichungsdatum": "01.07.2019",
                        "Zeitraum": "01.07.2019 - 01.07.2019"
                    },
                qualityMetrics:
                    {
                        "score1": 1,
                        "score2": 2,
                        "score3": 3,
                    }
            },
        ];
        this.setState({
            loadingDataSets: false,
            loadingDataSetsError: false,
            dataSets: dataSets
        });
        // axios.post(`/dataSets/getSubList?searchQuery=${searchKey}&searchIn=${searchIn}`, selectedFilters)
        //     .then( response => {
        //         const dataSets = response.data;
        //         this.setState({
        //             loadingDataSets: false,
        //             loadingDataSetsError: false,
        //             dataSets: dataSets
        //         });
        //     } )
        //     .catch( err => {
        //         this.setState({
        //             loadingDataSets: false,
        //             loadingDataSetsError: true,
        //             dataSets: []
        //         });
        //     } );
    };


    render() {
        let numberOfResult = null;
        if (this.state.loadingNumberOfDataSetsError)
            numberOfResult =
                <div>
                    <Button onClick={this.reloadNumberOfDataSets}><FaRedo
                        id="TooltipNumberOfDataSetsFetchError"/></Button>
                    <span style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Error in Fetching number of datasets from the server</span>
                </div>;
        else if (this.state.loadingNumberOfDataSets)
            numberOfResult = <Spinner color="primary"/>;
        else if (this.state.numberOfDataSets !== null)
            if (this.state.numberOfDataSets === -1)
                numberOfResult =
                    <div>
                        <Button onClick={this.reloadNumberOfDataSets}><FaRedo
                            id="TooltipNumberOfDataSetsInternalServerError"/></Button>
                        <span
                            style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Internal Server Error</span>
                    </div>;
            else
                numberOfResult = this.state.numberOfDataSets;

        let dataSets = null;
        if (this.state.loadingDataSetsError)
            dataSets =
                <div>
                    <Button onClick={this.reloadDataSets}><FaRedo id="ToolTipDataSets"/></Button>
                    <span style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Error in Fetching dataSets from the server</span>
                </div>;
        else if (this.state.loadingDataSets)
            dataSets = <Spinner type="grow" color="primary"/>;
        else if (this.state.dataSets !== null)
            dataSets = this.state.dataSets.map(
                dataSet => (
                    <Col md={{size: 12}} key={dataSet.uri}>
                        {this.state.isLongView ? <LongView dataSet={dataSet}/> : <ShortView dataSet={dataSet}/>}
                    </Col>
                )
            );

        const isMobile = this.state.screenWidth <= 700;

        return (
            <Col md={{size: 12}}>
                <Row>
                    <Col xs={isMobile ? {size: 12} : {size: 9}}>
                        <Table hover bordered responsive striped style={{display: 'block'}}>
                            <thead>
                            <tr>
                                <th style={{width: '1%'}}>
                                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                        <span> {numberOfResult} </span>
                                        <div style={{flexGrow: 1}}/>
                                        <Button style={{marginLeft: '2px'}}> Export</Button>
                                        <Button style={{marginLeft: '2px'}} onClick={this.largeViewChanged}>
                                            {this.state.isLongView ? <FaThLarge/> : <FaThList/>}
                                        </Button>
                                        <ButtonDropdown style={{marginLeft: '2px'}} isOpen={this.state.dropdownOpen}
                                                        toggle={this.toggle}>
                                            <DropdownToggle caret>
                                                {this.state.listOrderByValues[this.state.selectedOrder]}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {
                                                    this.state.listOrderByValues.map((orderBy, idx) => {
                                                        return <DropdownItem onClick={() => this.orderByChanged(idx)}
                                                                             active={idx === this.state.selectedOrder}
                                                                             key={idx}>{orderBy}</DropdownItem>
                                                    })
                                                }
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                        {isMobile ? <Button style={{marginLeft: '2px'}}
                                                            onClick={this.toggleFilters}>Filters</Button> : ''}
                                        {this.state.isFiltersOpen && isMobile ? <div className="dropdown-menu" style={{
                                            top: '17%',
                                            display: 'block',
                                            left: '4%',
                                            width: '90%'
                                        }}>
                                            <FiltersView applyFilters={this.applyFilters}/>
                                        </div> : ''}
                                    </div>

                                </th>
                            </tr>
                            </thead>
                            <tbody style={isMobile ? {
                                    display: 'block',
                                    height: '300px',
                                    'overflowX': 'hidden',
                                    width: '100%'
                                } :
                                {display: 'block', 'overflowX': 'hidden', width: '100%'}}>
                            <tr style={{display: 'block'}}>
                                <td style={{display: 'block'}}>
                                    {dataSets}
                                    <Row style={{'paddingTop': '1rem'}}>
                                        <Button className="mx-auto" style={{marginBottom: '1rem'}}
                                                onClick={this.load10More} disabled={this.state.dataSets === null}> Load
                                            10 more </Button>
                                    </Row>
                                </td>
                            </tr>
                            </tbody>
                        </Table>

                    </Col>
                    {
                        !isMobile &&
                        <Col style={{'paddingLeft': '0'}} xs={{size: 3}}>
                            <div style={{position: 'fixed', width: '23%'}}>
                                <FiltersView
                                    filters={this.state.filters}
                                    selectedFilters={this.state.selectedFilters}
                                    onAppendSelectedValues={this.onAppendSelectedValues}
                                    applyFilters={this.applyFilters}
                                />
                            </div>
                        </Col>
                    }
                </Row>

            </Col>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchKey: state.searchKey.key,
        searchIn: state.searchKey.searchIn,
        selectedSearchIn: state.searchKey.selectedSearstachIn
    }
};

export default connect(mapStateToProps, null)(TableView);