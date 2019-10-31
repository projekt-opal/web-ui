import React from 'react';
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle} from "reactstrap";
import ModalDatasetView from './ModalDatasetView';
import {connect} from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';

class LongView extends React.Component {

    state = {
        isOneLineDescription: true,
    };

    oneLineDescriptionClicked = (e) => {
        e.stopPropagation();
        let newState = {...this.state};
        newState.isOneLineDescription = !newState.isOneLineDescription;
        this.setState(newState);
    };

    showDatasetView = () => {
        this.props.onToggleModal(!this.props.isModalOpen);
    }

    render() {

        let description = this.props.dataSet.description;
        if (this.state.isOneLineDescription)
            description = description.substr(0, 100);

        let title = this.props.dataSet.title;

        let keywords = this.props.dataSet.keywords;
        let theme = this.props.dataSet.theme;
        let catalog = this.props.dataSet.catalog;
        let harvestingDate = this.props.dataSet.issueDate;
        let dataSetFileType = this.props.dataSet.fileType;

        // <Input addon type="checkbox" style={{verticalAlign: 'middle', position: 'relative'}}
        //        aria-label="Checkbox for following text input"/>

        return (
            <Card color="LightCard" style={{flexGrow: '1'}} onClick={this.showDatasetView}>
                <ModalDatasetView dataSet={this.props.dataSet}/>
                <CardHeader>
                    <CardTitle style={{display: 'inline', marginLeft: '0.5em'}} onClick={this.showDatasetView}>{title}</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle> {description}
                        {
                            this.props.dataSet.description.length > 100 &&
                            <Button color="link" onClick={this.oneLineDescriptionClicked}>
                                {this.state.isOneLineDescription ? 'more' : 'less'}
                            </Button>
                        }
                    </CardSubtitle>
                    <CardText>
                        <span> harvesting Date: </span>
                        <span>{harvestingDate}</span>
                    </CardText>
                    <Badge>{dataSetFileType}</Badge>
                    <CardFooter className="text-muted">
                        <div>
                            <span>{catalog}</span>
                            <span style={{marginLeft: '3rem'}}>{theme}</span>
                            <br/>
                            {
                                keywords.map((keyword, idx) => {
                                    return (
                                        <span key={idx} style={{marginLeft: '4px'}}>
                                {keyword}
                                </span>
                                    );
                                })
                            }
                        </div>
                    </CardFooter>
                </CardBody>
            </Card>
        );
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

export default connect(mapStateToProps, mapDispatchToProps) (LongView);