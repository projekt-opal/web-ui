import React from 'react';
import {Button, Modal, ModalFooter,} from "reactstrap";
import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import axios from '../../../../../webservice/axios-dataSets';
import DatasetViewLayout from "../../../layout/datasetViewLayout";

class ModalDatasetView extends React.Component {

    state = {
        dataSet: null,
        tooltipOpen: false
    };

    showDatasetView = () => {
        this.props.onToggleModal();
    };

    countRating = (overallRating) => {
        const rating = [0, 0, 0, 0, 0];
        for (let i = 1; i <= overallRating; i++)
            rating[i - 1] = 2;
        if (overallRating - Math.floor(overallRating) >= 0.5)
            rating[Math.floor(overallRating)] = 1;
        return (<span>
            {
                rating.map((r, idx) => r === 0 ? <FaRegStar key={idx}/> : r === 1 ? <FaStarHalfAlt key={idx}/> :
                    <FaStar key={idx}/>)
            }
        </span>);
    };

    componentDidMount() {
        axios.get("/dataSet?uri=" + this.props.uri)
            .then(response => {
                this.setState({dataSet: response.data})//response.data})
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Modal isOpen={this.props.isModalOpen} size='lg'
                   toggle={this.showDatasetView}>
                {this.state.dataSet === null ? '' : <DatasetViewLayout dataSet={this.state.dataSet}/>}
                <ModalFooter>
                    <Button color="secondary" onClick={this.showDatasetView}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

export default ModalDatasetView;