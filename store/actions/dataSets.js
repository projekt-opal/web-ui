import * as actionTypes from './actionTypes';
import axios from '../../webservice/axios-dataSets';

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

export const fetchDataSets = () => {
    return dispatch => {
        dispatch(fetchDataSetsStart());
        axios.post('/dataSets/getSubList')
            .then( response => {
                const dataSets = response.data;
                dispatch(fetchDataSetsSuccess(dataSets));
            } )
            .catch( err => {
                dispatch(fetchDataSetsFail(err));
            } );
    };
};
