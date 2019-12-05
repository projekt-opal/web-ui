import React from 'react';
import {Button, Col, Spinner} from "reactstrap";
import LongView from "../dataset/LongView";
import ShortView from "../dataset/ShortView";
import {FaRedo} from "react-icons/fa";

const LoadingDataSets = (props) => {
    let dataSets = null;
    if (props.loadingDataSetsError)
        dataSets =
            <div>
                <Button onClick={props.reloadDataSets}><FaRedo id="ToolTipDataSets"/></Button>
                <span style={{marginLeft: '3px', fontSize: '8px', fontWeight: '500'}}>Error in Fetching dataSets from the server</span>
            </div>;
    else if (props.loadingDataSets)
        dataSets = <Spinner type="grow" color="primary"/>;
    else if (props.dataSets !== null)
        dataSets = props.dataSets.map(
            dataSet => (
                <Col md={{size: 12}} key={dataSet.uri}>
                    {props.isLongView ? <LongView dataSet={dataSet}/> : <ShortView dataSet={dataSet}/>}
                </Col>
            )
        );
    return dataSets;
};

export default LoadingDataSets;