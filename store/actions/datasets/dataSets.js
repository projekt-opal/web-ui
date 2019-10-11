import * as actionTypes from './actionTypes';
import axios from '../../../webservice/axios-dataSets';

export const fetchDataSetsStart = () => {
    return {
        type: actionTypes.FETCH_DATASETS_START
    };
};

export const fetchDataSetsSuccess = (dataSets ) => {
    return {
        type: actionTypes.FETCH_DATASETS_SUCCESS,
        dataSets: dataSets
    };
};

export const fetchDataSetsFail = (error ) => {
    return {
        type: actionTypes.FETCH_DATASETS_FAIL,
        error: error
    };
};

export const fetchDataSets = (searchKey, searchIn, /*todo orderBy, */selectedFilters) => {
    return dispatch => {
        dispatch(fetchDataSetsStart());
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
            },{
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
            },{
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
        dispatch(fetchDataSetsSuccess(dataSets));
        // axios.post(`/dataSets/getSubList?searchQuery=${searchKey}&searchIn=${searchIn}`, selectedFilters)
        //     .then( response => {
        //         const dataSets = response.data;
        //         dispatch(fetchDataSetsSuccess(dataSets));
        //     } )
        //     .catch( err => {
        //         dispatch(fetchDataSetsFail(err));
        //     } );
    };
};


export const getNumberOfDataSetsStart = () => {
    return {
        type: actionTypes.GET_NUMBER_DATASETS_START
    }
};
export const getNumberOfDataSetsSuccess = (num) => {
    return {
        type: actionTypes.GET_NUMBER_DATASETS_SUCCESS,
        numberOfDataSets: num
    }
};
export const getNumberOfDataSetsFail = (error) => {
    return {
        type: actionTypes.GET_NUMBER_DATASETS_FAIL,
        error: error
    }
};

export const getNumberOfDataSets = (searchKey, searchIn, /*todo orderBy, */selectedFilters) => {
    return dispatch => {
        dispatch(getNumberOfDataSetsStart());
        const numberOfDataSets = 79423;
        dispatch(getNumberOfDataSetsSuccess(numberOfDataSets));
        // axios.post(`/dataSets/getNumberOfDataSets?searchQuery=${searchKey}&searchIn=${searchIn}`, selectedFilters)
        //     .then( response => {
        //         const numberOfDataSets = response.data;
        //         dispatch(getNumberOfDataSetsSuccess(numberOfDataSets));
        //     } )
        //     .catch( err => {
        //         dispatch(getNumberOfDataSetsFail(err));
        //     } );
    };
};


export const load10MoreSuccess = (dataSets) => {
    return {
        type: actionTypes.LOAD_10_MORE,
        additionalDataSets: dataSets
    };
};

export const load10More = (searchKey, searchIn, /*todo orderBy, */low, selectedFilters) => {
    return dispatch => {
        axios.post(`/dataSets/getSubList?searchQuery=${searchKey}&searchIn=${searchIn}&low=${low}`, selectedFilters)
            .then(response => {
                let dataSets = response.data;
                dispatch(load10MoreSuccess(dataSets));
            });
    };
};

export const toggleModal = (isModalOpen) => {
    return {
        type: actionTypes.TOGGLE_MODAL,
        isModalOpen: isModalOpen
    };
};