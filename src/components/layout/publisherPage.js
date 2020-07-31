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
                    const filters = response.data.filter(i => i.filterGroupTitle === "Publisher");
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
                      this.state.filters.map((p, idx) => {
                          return (
                              <tr key={idx}>
                                  <td>{p.label}
                                    <span>
                                        {p.value}
                                        <Link href={"/view/one?label="+p.value}>
                                            <a target="_blank" style={{textDecoration: 'none', color: 'gray'}}>
                                                    <FaExternalLinkAlt/>
                                            </a>
                                        </Link>
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
export default PublisherPage;