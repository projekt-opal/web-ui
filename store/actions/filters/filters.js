import * as actionTypes from './actionTypes';
import axios from '../../../webservice/axios-dataSets';
//import { request } from 'graphql-request'

export const fetchFiltersStart = () => {
    return {
        type: actionTypes.FETCH_FITLERS_START
    };
};

export const fetchFiltersSuccess = (filters) => {
    return {
        type: actionTypes.FETCH_FITLERS_SUCCESS,
        filters: filters
    };
};

export const fetchFiltersFail = (error ) => {
    return {
        type: actionTypes.FETCH_FITLERS_FAIL,
        error: error
    };
};

export const fetchFilters = () => {
    return dispatch => {    
        dispatch(fetchFiltersStart());

        axios.get("/headers")
            .then(response => {
                const headers = response.data;

                //const headers = ["theme", "theme2", "theme3"];
                headers.forEach(h => {
                    axios.get("/values", { title : h })
                    .then(response => {
                        const values = response.data;
                        const filters = [];
                        filters.push({ 
                            title: h,
                            values: values,
                        });

                        //const filters = [
                        // {
                        //     title: "theme",
                        //     values: [
                                // {uri:"uri1",value:"value 1",label:"l1",count:10},
                                // {uri:"uri2",value:"value 2",label:"l2",count:10},
                                // {uri:"uri3",value:"value 3",label:"l3",count:310}
                        //      ]
                        // },
                        // {
                        //     title: "theme2",
                        //     values: [
                                // {uri:"uri1",value:"value 1",label:"l1",count:10},
                                // {uri:"uri2",value:"value 2",label:"l2",count:10},
                                // {uri:"uri3",value:"value 3",label:"l3",count:310}
                        //      ]
                        // },
                        //{
                        //     title: "theme3",
                        //     values: [
                                // {uri:"uri1",value:"value 1",label:"l1",count:10},
                                // {uri:"uri2",value:"value 2",label:"l2",count:10},
                                // {uri:"uri3",value:"value 3",label:"l3",count:310}
                        //      ]
                        // }];

                        filters.forEach(f => {
                            f.values.forEach(v => {
                                axios.get("/count", { 
                                    header: f.title,
                                    uri: v.uri,
                                    searchKey: this.props.searchKey,
                                    searchIn: this.props.searchIn, 
                                })
                                .then(response => {
                                    let count = response.data;
                                    const results = [];
                                    const fullvalues = [];
                                    fullvalues.push({
                                        uri: v.uri,
                                        value: v.value,
                                        label: v.label,
                                        count: count,
                                    });
                                    results.push({
                                        title: f.title,
                                        values: fullvalues,
                                    });

                                    //const results = 
                                    // [   {
                                    //         title: "Theme",
                                    //         values: [
                                    //             {uri:"uri1",value:"value 1",label:"l1",count:10},
                                    //             {uri:"uri2",value:"value 2",label:"l2",count:10},
                                    //             {uri:"uri3",value:"value 3",label:"l3",count:310}
                                    //         ]
                                    //     },
                                    //     {
                                    //         title: "Theme2",
                                    //         values: [
                                    //             {uri:"uri1",value:"value 4",label:"l4",count:10},
                                    //             {uri:"uri2",value:"value 5",label:"l5",count:10},
                                    //             {uri:"uri3",value:"value 6",label:"l6",count:310}
                                    //         ]
                                    // }];

                                    dispatch(fetchFiltersSuccess(results));
                                }) 
                            })
                        }) 
                    })
                }) 
            })
            .catch( err => {
                dispatch(fetchFiltersFail(err));
            } );

    };
};



export const func = (selectedFilterPropertyURI, selectedFilterURI) => {
    return {
        type: actionTypes.APPEND_FILTER,
        property: selectedFilterPropertyURI,
        uri: selectedFilterURI
    };
};


export const appendSelectedFilter = (selectedFilterPropertyURI, selectedFilterURI) => {
    return dispatch => {
        dispatch(func(selectedFilterPropertyURI, selectedFilterURI));
    };
};

export const appendSelectedValues = (title, value, label) => {
    return dispatch => {
        let obj = {
            title: title,
            value: value,
            label: label,
            type: actionTypes.APPEND_FILTER_VALUE,
        }
        dispatch(obj);
    };
};