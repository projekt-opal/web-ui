import React from 'react';
import { Container, Table, Spinner, Button } from "reactstrap";
import axios from "../../../webservice/axios-dataSets";
import {FaExternalLinkAlt} from 'react-icons/fa';
import Link from 'next/link';
import {withTranslation} from 'react-i18next';

class PublisherStats extends React.Component {

    state = {
        isOneLineDescriptionCatalogs: true,
    };

    oneLineDescriptionCatalogsClicked = () => {
        let newState = {...this.state};
        newState.isOneLineDescriptionCatalogs = !newState.isOneLineDescriptionCatalogs;
        this.setState(newState);
    };

    render() {
      const {t} = this.props;
        return (
          <div>
              <span>Most used data formats:<br/>
              {

                this.props.p.mostUsedDataFormats.map((format, idxx) => {
                            return (
                                  <span key={idxx}>{" "+format+" "}</span>    
                            );
                        })
              }</span>

              <p></p>
              <span>Most used categories:<br/>
              {this.state.isOneLineDescriptionCatalogs ? 
                this.props.p.mostUsedDataCategories.slice(0,3).map((category, idxx) => {
                            return (
                                  <div key={idxx}>{" "+category+";"}</div>    
                            );
                        }) :

                this.props.p.mostUsedDataCategories.map((category, idxx) => {
                            return (
                                  <div key={idxx}>{" "+category+";"}</div>    
                            );
                        })
              }</span>
              <Button color="link" onClick={this.oneLineDescriptionCatalogsClicked}>
                {this.state.isOneLineDescriptionCatalogs ? t('show more') : t('show less')}
              </Button> 
          </div>       
        );
    }
}
export default withTranslation()(PublisherStats);
