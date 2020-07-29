import React from 'react';
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle} from "reactstrap";
import ModalDatasetView from './ModalDatasetView';
import Link from 'next/link';
import {FaExternalLinkAlt} from "react-icons/fa";
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import {getTitle, getDescription} from '../../../../DataUtils';


class LongView extends React.Component {

    state = {
        isOneLineDescription: true,
        isModalOpen: false,
        isNewDatasetViewOpen: false,
        dataSet: null
    };

    oneLineDescriptionClicked = (e) => {
        e.stopPropagation();
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
        if (this.state.isOneLineDescription) description = description.substr(0, 250);

        const theme = this.props.dataSet.theme && this.props.dataSet.theme.length > 0 ? <><br /><span>Theme: </span>
                <span style={{marginLeft: '2rem'}}>{this.props.dataSet.theme.join(', ')}</span>
            </>
        : null;

        const issueDate = this.props.dataSet.issueDate ? <><br /><span> Issue Date: </span>
            <span style={{marginLeft: '2rem'}}>{this.props.dataSet.issueDate}</span>
        </> : null;

        const license = this.props.dataSet.license && this.props.dataSet.license.length > 0 ? <><br /><span>License: </span>
                <span style={{marginLeft: '2rem'}}>{this.props.dataSet.license.join(', ')}</span></>
            : null;

        const dataSetViewLink = "/view/datasetView?uri=" + this.props.dataSet.uri;

        return (
            <>
                {
                    this.state.isModalOpen &&
                    <ModalDatasetView
                        isModalOpen={this.state.isModalOpen}
                        onToggleModal={() => this.toggleModal()}
                        uri={this.props.dataSet.uri}
                    />
                }
                <Card color="LightCard" style={{flexGrow: '1', marginTop:'1em'}}>
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
                                (this.props.dataSet.description && this.props.dataSet.description.length > 250) &&
                                <Button color="link" onClick={this.oneLineDescriptionClicked} style={{padding:'0px 4px'}}>
                                    {this.state.isOneLineDescription ? t('show more') : t('show less')}

                                </Button>
                            }
                        </CardSubtitle>
                        <CardText>
                            {issueDate}
                            {theme}
                            {license}
                            <br />
                        </CardText>
                    </CardBody>
                </Card>
            </>
        )
            ;
    }
}

export default withTranslation()(LongView);
