import * as actionTypes from './actionTypes';
import axios from '../../../webservice/axios-dataSets';
import { request } from 'graphql-request'

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

const queryAllFilters = `{
  allFilters(last: 10){
    uri
    title
    values {
      uri,
      value,
      label,
      count
    }
  }
}`

export const fetchFilters = () => {
    return dispatch => {    
        dispatch(fetchFiltersStart());
        
        request(axios.defaults.baseURL+'allFilters', queryAllFilters).then(data =>
          {
            dispatch(fetchFiltersSuccess(data));
          }
        )
        .catch( err => {
            dispatch(fetchFiltersFail(err));
        } );


        // const filters = [{
        //     uri: "http://www.w3.org/ns/dcat#theme",
        //     title: "Theme",
        //     values: [
        //         {uri:"uri1",value:"value 1",label:"l1",count:10},
        //         {uri:"uri2",value:"value 2",label:"l2",count:10},
        //         {uri:"uri3",value:"value 3",label:"l3",count:310}
        //         ]
        //     },
        //     {
        //     uri: "http://www.w3.org/ns/dcat#theme",
        //     title: "Theme2",
        //     values: [
        //         {uri:"uri1",value:"value 4",label:"l4",count:10},
        //         {uri:"uri2",value:"value 5",label:"l5",count:10},
        //         {uri:"uri3",value:"value 6",label:"l6",count:310}
        //         ]
        //     }];
        // dispatch(fetchFiltersSuccess(filters));
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