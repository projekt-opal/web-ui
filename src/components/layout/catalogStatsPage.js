import React from 'react';
import { Container, Table, Spinner, Button } from "reactstrap";
import axios from "../../../webservice/axios-dataSets";
import {FaExternalLinkAlt} from 'react-icons/fa';
import Link from 'next/link';
import {withTranslation} from 'react-i18next';
import Stats from "./Stats"

class CatalogStatsPage extends React.Component {

    state = {
        searchKey: '',
        selectedSearchIn: [],
        filters: [],
        loadingFilters: true,
        loadingFiltersError: false,

        searchDTO: {
            searchKey: "",
            searchIn: [],
            orderBy: {
                selectedOrderValue: "relevance"
            },
            filters: []
        },
    };

    componentDidMount = () => {
        this.fetchFiltersList();
    };

    fetchFiltersList = () => {
        this.setState({
            filters: [],
            loadingFilters: true,
            loadingFiltersError: false
        }, () => {
            axios.post(`/filters/list`, this.state.searchDTO)
                .then(response => {
                    const filters = response.data.filter(i => i.filterGroupTitle === "Catalog");
                    this.setState(
                        {
                            filters: filters[0].values,
                            loadingFilters: false,
                            loadingFiltersError: false
                        });
                        //,() => this.updateFilterValueCounts());
                }
                ).catch(error => {
                    this.setState({
                        filters: [],
                        loadingFilters: false,
                        loadingFiltersError: true
                    });
                });
        });
    };

    updateFilterValueCounts = () => {
        const filters = [...this.state.filters];
        filters.forEach(f => {
            f.values.forEach(v => {
                if (v.count === -1) {
                    axios.post(`/filter/count?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}`,
                        {
                            filterUri: f.uri,
                            valueUri: v.uri
                        })
                        .then(response => {
                            v.count = response.data;
                        })
                        .catch(err => console.log(err));
                }
            });
        });
        this.setState({ filters: filters });
    };

    render() {
      const {t} = this.props;
        return (
            <Container fluid>
                <h1 className='mt-4'>{t('Top source data portals')}</h1>
                <br />
                {this.state.filters.length ?
                <Table borderless striped>
                  <thead>
                    <tr style={{background: 'rgb(55, 171, 156)'}}>
                      <th style={{color: 'rgb(255, 255, 255)'}}>{t('Catalog')}</th>
                      <th style={{color: 'rgb(255, 255, 255)'}}>{t('Number of datasets')}</th>
                    </tr>
                  </thead>
                  <tbody>
                  { 
                      this.state.filters.map((p, idx) => {
                          return (
                              <tr key={idx}>
                                  <td>{p.label}
                                    <span>
                                        <b>{p.value}</b> &nbsp;

                                        {/*<Link href={"/view/one?label="+p.value}>
                                            <a target="_blank" style={{textDecoration: 'none', color: 'rgb(79, 171, 227)'}}>
                                                    <FaExternalLinkAlt/>
                                            </a>
                                        </Link>*/}
                                        <p></p>
                                        <Stats p={p}/>
                                    </span>
                                  </td>
                                  <td>{p.count.absolute}</td>
                              </tr>
                          );
                      }) 
                  }
                  </tbody>
                </Table>
                : <Spinner size="sm"/>      
              }
            </Container>
        );
    }
}
export default withTranslation()(CatalogStatsPage);