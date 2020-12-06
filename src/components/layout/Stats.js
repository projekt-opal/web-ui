import React from 'react';
import { Container, Table, Spinner, Button } from "reactstrap";
import axios from "../../../webservice/axios-dataSets";
import {FaExternalLinkAlt} from 'react-icons/fa';
import Link from 'next/link';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';

class Stats extends React.Component {

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
              <span>{t('Used data formats')}:<br/>
              {this.state.isOneLineDescriptionCatalogs ? 

                this.props.p.mostUsedDataFormats.slice(0,3).map((format, idxx) => {
                            return (
                                  <div key={idxx}>{" • "+format+" "}</div>    
                            );
                        })
                :
                this.props.p.mostUsedDataFormats.map((format, idxx) => {
                            return (
                                  <div key={idxx}>{" • "+format+" "}</div>    
                            );
                        })
              }</span>

              <p></p>
              <span>{t('Used categories')}:<br/>
              {this.state.isOneLineDescriptionCatalogs ? 
                this.props.p.mostUsedDataCategories.slice(0,3).map((category, idxx) => {
                            return (
                                  <div key={idxx}>{" • "+t(category.substring(60))}</div>    
                            );
                        })
                :
                this.props.p.mostUsedDataCategories.map((category, idxx) => {
                            return (
                                  <div key={idxx}>{" • "+t(category.substring(60))}</div>    
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
export default withTranslation()(Stats);
