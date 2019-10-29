import React from 'react';
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
import {FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import ReactTooltip from 'react-tooltip'
import {connect} from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';

class ModalDatasetView extends React.Component {

    state = {
        tooltipOpen: false
    };

    showDatasetView = () => {
        this.props.onToggleModal(!this.props.isModalOpen);
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

    render() {
        const datasetView = this.props.dataSet;
        let overallRatingMain = this.countRating(datasetView.overallRating);
        const otherRatings = {};
        if(datasetView.qualityMetrics) {
            Object.keys(datasetView.qualityMetrics).forEach(key => {
                otherRatings[key] = this.countRating(datasetView.qualityMetrics[key]);
            });
        }

        return '';

        // return (
        //     <CardHeader>
        //         <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        //             <label style={{display: 'block'}}>
        //
        //                 <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}><a
        //                     href="#">{this.props.dataSet.title}</a></CardTitle>
        //                 <Modal isOpen={this.props.isModalOpen} size='lg'
        //                        toggle={this.showDatasetView}>
        //                     <ModalHeader toggle={this.showDatasetView}>{datasetView.title}</ModalHeader>
        //                     <ModalBody>
        //                         <p>Description: {datasetView.description}</p>
        //                         <p style={{'float': 'left', 'marginRight': '15px', 'marginTop': '10px'}}>Data
        //                             file(s)</p>
        //                         <Card style={{'marginBottom': '15px', 'padding': '10px'}}>
        //                             <div style={{'display': 'flex'}}>
        //                                 <div style={{'flex': '50%'}}>{datasetView.dataFiles.name}</div>
        //                                 <div style={{'flex': '50%'}}>{datasetView.dataFiles.publisher}</div>
        //                             </div>
        //
        //                             {datasetView.dataFiles.links.map((i, idx) => {
        //                                 return <div key={idx}>
        //                                     <Badge>{i.fileType}</Badge>
        //                                     <a href={i.link}>
        //                                         {i.link}
        //                                     </a>
        //                                 </div>
        //                             })}
        //
        //
        //                         </Card>
        //
        //                         <Card style={{'padding': '10px', 'marginBottom': '15px'}}>
        //                             <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}>Metadata
        //                                 info</CardTitle>
        //                             <Table bordered>
        //                                 <tbody>
        //                                 {
        //                                     Object.keys(datasetView.metadataInfo).map((key, idx) => {
        //                                         return <tr key={idx}>
        //                                             <td>{key}</td>
        //                                             <td>{datasetView.metadataInfo[key]}</td>
        //                                         </tr>
        //                                     })
        //                                 }
        //                                 </tbody>
        //                             </Table>
        //                         </Card>
        //
        //                         <Card style={{'padding': '10px'}}>
        //                             <CardTitle style={{display: 'inline', marginLeft: '0.5em'}}>Quality
        //                                 metrics</CardTitle>
        //                             <Table bordered>
        //                                 <thead>
        //                                 <tr>
        //                                     <th>Overall score</th>
        //                                     <th>
        //                                         {overallRatingMain}
        //                                     </th>
        //                                 </tr>
        //                                 </thead>
        //                                 <tbody>
        //                                 {
        //                                     Object.keys(otherRatings).map((key, idx) => {
        //                                         return <tr key={idx}>
        //                                             <td><span data-tip="some text">{key}</span>
        //                                                 <ReactTooltip place="bottom"/>
        //                                             </td>
        //
        //                                             <td>{otherRatings[key]}</td>
        //                                         </tr>
        //                                     })
        //                                 }
        //                                 </tbody>
        //                             </Table>
        //                         </Card>
        //
        //                     </ModalBody>
        //                     <ModalFooter>
        //                         <Button color="secondary" onClick={this.showDatasetView}>Cancel</Button>
        //                     </ModalFooter>
        //                 </Modal>
        //             </label>
        //             <div style={{flexGrow: '1'}}/>
        //             {overallRatingMain}
        //         </div>
        //     </CardHeader>
        // );
    }

}

const mapStateToProps = state => {
    return {
        isModalOpen: state.ds.isModalOpen
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleModal: (isModalOpen) => dispatch(actionCreators.toggleModal(isModalOpen)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDatasetView);