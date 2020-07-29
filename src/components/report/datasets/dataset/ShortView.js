import React from 'react';
import {Badge, Button, Input, Card, CardBody, CardHeader, CardSubtitle, CardTitle} from "reactstrap";
import {FaExternalLinkAlt, FaRegStar, FaStar, FaStarHalfAlt} from "react-icons/fa";
import ModalDatasetView from "./ModalDatasetView";
import Link from 'next/link';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import {getTitle, getDescription} from '../../../../DataUtils';

class ShortView extends React.Component {

    state = {
        isOneLineDescription: true,
        isModalOpen: false
    };

    oneLineDescriptionClicked = () => {
        let newState = {...this.state};
        newState.isOneLineDescription = !newState.isOneLineDescription;
        this.setState(newState);
    };

    toggleModal = () => {
        const isModalOpen = !this.state.isModalOpen;
        this.setState({isModalOpen: isModalOpen});
    };

    render() {
        const {t} = this.props;
        const title = getTitle(this.props.dataSet, i18n.language);

        let description = getDescription(this.props.dataSet, i18n.language);
        if (this.state.isOneLineDescription) description = description.substr(0, 150);

        const dataSetViewLink = "./view/datasetView?uri=" + this.props.dataSet.uri;

        return (
            <Card color="LightCard" style={{flexGrow: '1', marginTop:'1em'}}>
                {
                    this.state.isModalOpen &&
                    <ModalDatasetView
                        isModalOpen={this.state.isModalOpen}
                        onToggleModal={() => this.toggleModal()}
                        uri={this.props.dataSet.uri}
                    />
                }
                <CardHeader style={{background: '#37AB9C'}}>
                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                        <CardTitle style={{display: 'inline', fontWeight:'bold', cursor:'pointer', width:'95%'}} onClick={() => this.toggleModal()}>
                            <span style={{color: '#fff'}}>{title}</span>
                        </CardTitle>
                        <div style={{flexGrow: '1'}}/>
                        <Link href={dataSetViewLink}>
                            <a target="_blank" style={{textDecoration: "none", color: '#fff'}}>
                                <FaExternalLinkAlt/>
                            </a>
                        </Link>
                    </div>
                </CardHeader>
                <CardBody>
                    <CardSubtitle> {description}
                        {
                            (this.props.dataSet.description && this.props.dataSet.description.length > 150) &&
                            <Button color="link" onClick={this.oneLineDescriptionClicked}>
                                {this.state.isOneLineDescription ? t('show more') : t('show less')}
                            </Button>
                        }
                    </CardSubtitle>
                </CardBody>
            </Card>
        );
    }
}

export default withTranslation()(ShortView);
