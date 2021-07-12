import React from 'react'
import Layout from "../../components/layout/layout";
import {Container, Jumbotron} from "reactstrap";


const Home = () => (
    <Layout>
    <Container>

<br/>
<h2>About OPAL</h2>

<p>
The <a target="_blank" href="https://dice-research.org/OPAL">OPAL project</a> started in July 2017 and ended in December 2020.
The <b>final project report</b> is available as <a target="_blank" href="https://arxiv.org/pdf/2105.03161.pdf">PDF file</a> (in German) and
the <b>final presentation</b> can be accessed as <a target="_blank" href="https://projekt-opal.github.io/doc/final-presentation/Praesentation/">HTML</a> as well as <a target="_blank" href="https://github.com/projekt-opal/doc/raw/master/deliverables/OPAL_Abschlusspraesentation.pdf">PDF file</a> (in German).
</p>

<h4>Problem</h4>
<p>
In many areas of daily life, data is collected and made available. Examples include weather and climate data, information about road traffic or public transport. These data are increasingly being provided as open data in corresponding online portals, but are partly available in different formats and difficult to link. This makes it difficult for companies and authorities to search for suitable data records and also to use them, for example in the automotive and logistics sectors.
</p>

<h4>Project goal</h4>
<p>
The objectives of OPAL are the conception and development of a holistic portal for open data with an explicit focus on Germany. Procedures will be developed to allow users to find appropriate sets of records for a particular application. This is done via the search function of the portal as well as further demonstrators. For example, a social media wizard will provide users with appropriate open data for their requests.
</p>

<h4>Execution</h4>
<p>
In a first step, the requirements of user groups from research and industry are collected and analyzed. In a further step, a modular platform will be developed. A particular focus of OPAL is metadata refinement. Metadata records will be transferred to 5-Star Linked Open Data. The deployment as Linked Data allows users to combine data with additional data sources from other domains and therefore to generate an extended knowledge base. This results in improved findability of data for specific applications and sectors, e.g. the automotive and logistics industry.
</p>

<h4>Project resources</h4>
<ul>
<li><strong>Code</strong> repositories are listed at: <a target="_blank" href="https://github.com/projekt-opal/doc#repositories">https://github.com/projekt-opal/doc#repositories</a></li>
<li><strong>Data</strong> is stored at: <a target="_blank" href="https://hobbitdata.informatik.uni-leipzig.de/OPAL/" rel="nofollow">https://hobbitdata.informatik.uni-leipzig.de/OPAL/</a></li>
<li><strong>Deliverables</strong> are listed at the OPAL website, see: <a target="_blank" href="http://projekt-opal.de/en/results/deliverables/" rel="nofollow">http://projekt-opal.de/en/results/deliverables/</a></li>
<li><strong>Demo</strong> is linked at the DICE website, see: <a target="_blank" href="https://dice-research.org/OPAL-Demo" rel="nofollow">https://dice-research.org/OPAL-Demo</a></li>
<li><strong>Publications</strong> are listed at the DICE website, see: <a target="_blank" href="https://dice-research.org/OPAL" rel="nofollow">https://dice-research.org/OPAL</a></li>
</ul>

<h4>Credits</h4>
<p><a target="_blank" href="https://dice-research.org/">Data Science Group (DICE)</a> at <a target="_blank" href="https://www.uni-paderborn.de/">Paderborn University</a></p>
<p>
This work has been supported by the German Federal Ministry of Transport and Digital Infrastructure (BMVI) in the project <a target="_blank" href="http://projekt-opal.de/">Open Data Portal Germany (OPAL)</a> (funding code 19F2028A).
</p>

    </Container>
    </Layout>
);

export default Home
