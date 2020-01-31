import React from 'react';
import { Container, Table, Spinner } from "reactstrap";
import axios from "../../../webservice/axios-dataSets";
import {FaExternalLinkAlt} from 'react-icons/fa';
import Link from 'next/link';

class PublisherPage extends React.Component {

    state = {
        searchKey: '',
        selectedSearchIn: [],
        filters: [],
        loadingFilters: true,
        loadingFiltersError: false,
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
            axios.get(`/filters/list?searchKey=${this.state.searchKey}&searchIn=${this.state.selectedSearchIn}`)
                .then(response => {
                    const filters = response.data.filter(i => i.title === "Publisher");
                    this.setState(
                        {
                            filters: filters,
                            loadingFilters: false,
                            loadingFiltersError: false
                        }, () => this.updateFilterValueCounts());
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

        return (
            <Container fluid>
                <br />
                {this.state.filters.length ?
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Provider name</th>
                      <th>Number of datasets</th>
                    </tr>
                  </thead>
                  <tbody>
                  { 
                      this.state.filters[0].values.map((p, idx) => {
                          return (
                              <tr key={idx}>
                                  <td>{p.label}
                                    <span>
                                        <Link href={"/view/one?uri=" + p.uri + "&label=" + p.label}>
                                            <a target="_blank" style={{textDecoration: 'none', color: 'gray'}}>
                                                    <FaExternalLinkAlt/>
                                            </a>
                                        </Link>
                                    </span>
                                  </td>
                                  <td>{p.count}</td>
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
export default PublisherPage;