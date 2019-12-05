import React from 'react';
import {Button, Spinner} from "reactstrap";
import {FaRedo} from "react-icons/fa";

const LoadingNumberOfResult = (props) => {
    let numberOfResult = null;

    if (props.loadingNumberOfDataSetsError)
        numberOfResult =
            <div>
                <Button onClick={props.reloadNumberOfDataSets}><FaRedo
                    id="TooltipNumberOfDataSetsFetchError"/></Button>
                <span style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Error in Fetching number of data sets from the server</span>
            </div>;
    else if (props.loadingNumberOfDataSets)
        numberOfResult = <Spinner color="primary"/>;
    else if (props.numberOfDataSets !== null)
        if (props.numberOfDataSets === -1)
            numberOfResult =
                <div>
                    <Button onClick={props.reloadNumberOfDataSets}><FaRedo
                        id="TooltipNumberOfDataSetsInternalServerError"/></Button>
                    <span
                        style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Internal Server Error</span>
                </div>;
        else
            numberOfResult = props.numberOfDataSets;

    return numberOfResult;
};

export default LoadingNumberOfResult;