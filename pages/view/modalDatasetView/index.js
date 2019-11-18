import React, { useState } from 'react';
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardTitle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
} from "reactstrap";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';
import axios from '../../../webservice/axios-dataSets';
import { withRouter } from 'next/router';
import DatasetView from '../../../components/layout/datasetView';

class ModalDatasetView extends React.Component {

    state = {
        dataSet: null,
        tooltipOpen: false,
    };

    componentDidMount = () => {
        this.setState({ dataSet: this.props.dataSet })
    }

    showDatasetView = () => {
        this.props.onToggleModal();
        this.setState({ openModalDatasetView: true })
    };

    render() {
        const { router } = this.props;
        //const modal = 
        return (
            <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <label style={{ display: 'block' }}>
                    {this.state.dataSet ? <Modal isOpen={this.props.isModalOpen} size='lg'
                        toggle={this.showDatasetView}>
                        <ModalHeader toggle={this.showDatasetView}>{this.props.dataSet.title}</ModalHeader>

                        <ModalBody><DatasetView dataSet={this.state.dataSet} /></ModalBody>

                    </Modal> : ''}



                </label>
                <div style={{ flexGrow: '1' }} />
                {/* {overallRatingMain} */}
            </div>
        );

    }

}

export default withRouter(ModalDatasetView);
