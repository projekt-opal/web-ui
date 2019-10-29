import * as actionTypes from './actionTypes';
import axios from '../../../webservice/axios-dataSets';

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