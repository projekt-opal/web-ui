import * as actionTypes from './actionTypes';
import axios from '../../../webservice/axios-dataSets';

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

export const fetchHeaders = (titles) => {
    return {
        type: actionTypes.FETCH_HEADERS,
        titles: titles
    };
};

export const fetchValues = (filters) => {
    return {
        type: actionTypes.FETCH_VALUES,
        values: filters
    };
};

export const fetchFilters = () => {
    return dispatch => {    
        dispatch(fetchFiltersStart());

        // axios.get("/titles")
        //     .then(response => {
        //         const titles = response.data;

                const titles = ["theme", "theme2", "theme3"];
                dispatch(fetchHeaders(titles));

                // titles.forEach(h => {
                //     axios.get("/values/?title=" + h)
                //     .then(response => {
                //         const values = response.data;
                //         const filter = { 
                //             title: h,
                //             values: values,
                //         };

                        const filter = {
                            title: "theme",
                            values: [
                                {uri:"uri1",value:"value 1",label:"l1"},
                                {uri:"uri2",value:"value 2",label:"l2"},
                                {uri:"uri3",value:"value 3",label:"l3"}
                             ]
                        };

                        dispatch(fetchValues(filter));

                        const filter2 = {
                            title: "theme2",
                            values: [
                                {uri:"uri4",value:"value 4",label:"l4"},
                                {uri:"uri5",value:"value 5",label:"l5"},
                                {uri:"uri6",value:"value 6",label:"l6"}
                             ]
                        };

                        dispatch(fetchValues(filter2));

                        // filter.values.forEach(v => {
                        //     axios.post("/count", {
                        //         header: filter.title,
                        //         uri: v.uri,
                        //         searchKey: "", //todo complete it
                        //         searchIn: "", //complete it
                        //     })
                        //     .then(response => {
                        //         let count = response.data;
                        //         const result = {
                        //             title: filter.title,
                        //             value: {
                        //                 uri: v.uri,
                        //                 value: v.value,
                        //                 label: v.label,
                        //                 count: count,
                        //             },
                        //         };

                                // const result = {
                                //     title: "Theme",
                                //     value: {uri:"uri1",value:"value 1",label:"l1",count:10},                 
                                // };

                                // dispatch(fetchFiltersSuccess(result));
            //                 }) 
            //             })

            //         })
            //     }) 
            // })
            // .catch( err => {
            //     dispatch(fetchFiltersFail(err));
            // } );

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

export const toggleFilters = (isFiltersOpen) => {
    return {
        type: actionTypes.TOGGLE_FILTERS,
        isFiltersOpen: isFiltersOpen
    };
};

export const pushLastSelectedValues = (lastSelectedValues) => {
    return {
        type: actionTypes.PUSH_LAST_SELECTED_VALUES,
        lastSelectedValues: lastSelectedValues
    };
};
