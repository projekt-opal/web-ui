import React from 'react'
import Layout from "../../components/layout/layout";
import {Container, Jumbotron} from "reactstrap";


const Home = () => (
    <Layout>
        <Jumbotron>
            <h2>Goals of the OPAL project</h2>
            Goals of the project Open Data Portal Germany (OPAL) are the conception and development of a holistic portal
            for open data . In particular, open data from mCLOUD and MDM are integrated. Unlike the majority of existing
            open data portals, OPAL will refine metadata and in 5-star linked open datatransform. The portal will thus
            ensure that data records can be easily found and easily accessed for both people and software agents (e.g.
            other data portals, data-driven applications, etc.). In addition, OPAL will also enable the search via
            content-related (instead of just metadata) facets (such as automatically generated topics, location
            information and time restrictions).
            <hr />
            <h2>Credits</h2>
            Data Science Group (DICE) at Paderborn University
            This work has been supported by the German Federal Ministry of Transport and Digital Infrastructure (BMVI) in the project Open Data Portal Germany (OPAL) (funding code 19F2028A).

        </Jumbotron>
        <hr/>
        <Container>
            <div className="content markdown-page">
                <h1>Contact information</h1>
                <h2>
                    <a className="header-link" href="https://dice-research.org/AxelCyrilleNgongaNgomo">
                        Prof.Dr. Axel-Cyrille Ngonga Ngomo</a>
                </h2>
                <div className="key-val">
                    <div className="key-row">
                        <div className="key">Position</div>
                        <div className="val">Head of DICE</div>
                    </div>
                    <div className="key-row">
                        <div className="key">Phone</div>
                        <div className="val"><a href="tel:+49 5251 603342">+49 5251 603342</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">Fax</div>
                        <div className="val"><a href="tel:+49-5251-603436">+49 5251 603436</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">Email</div>
                        <div className="val"><a href="mailto:axel.ngonga@upb.de">axel.ngonga@upb.de</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">Office</div>
                        <div className="val">TP6.3.106</div>
                    </div>
                    <div className="key-row">
                        <div className="key">Office hours</div>
                        <div className="val">Please contact Miss Auinger for an appointment</div>
                    </div>
                </div>
                <h2><a className="header-link" href="https://dice-research.org/SimoneAuinger">Simone Auinger</a></h2>
                <div className="key-val">
                    <div className="key-row">
                        <div className="key">Position</div>
                        <div className="val">Secretary</div>
                    </div>
                    <div className="key-row">
                        <div className="key">Phone</div>
                        <div className="val"><a href="tel:+49 5251 601764">+49 5251 601764</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">Email</div>
                        <div className="val"><a href="mailto:mone@upb.de">mone@upb.de</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">Office</div>
                        <div className="val">TP6.3.107</div>
                    </div>
                    <div className="key-row">
                        <div className="key">Office hours</div>
                        <div className="val">9:00 - 11:00 (Mondays - Thursdays)</div>
                    </div>
                </div>
                <h2>Dice in Social Media</h2>
                <div className="key-val">
                    <div className="key-row">
                        <div className="key">Facebook</div>
                        <div className="val"><a href="https://www.facebook.com/DiceUPB">facebook.com/DiceUPB</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">Twitter</div>
                        <div className="val"><a href="https://twitter.com/DiceResearch">@DiceResearch</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">GitHub</div>
                        <div className="val"><a href="https://github.com/dice-group">github.com/dice-group</a></div>
                    </div>
                    <div className="key-row">
                        <div className="key">Youtube</div>
                        <div className="val"><a href="https://www.youtube.com/channel/UCDshdIaiXqwZsQ4Gl_70OMA">Dice
                            DataScienceGroup</a>
                        </div>
                    </div>
                </div>
                <h2>Addresses</h2>
                <div className="key-val">
                    <div className="key-row">
                        <div className="key" style={{fontWeight: 'bold'}}>For Visitors</div>
                        <div className="val">
                            Technologiepark Paderborn <br/> Office: TP6.3.106 <br/>
                            Technologiepark 6 <br/> 33100 Paderborn
                        </div>
                    </div>
                    <div className="key-row">
                        <div className="key" style={{fontWeight: 'bold'}}>Postal Address</div>
                        <div className="val">Universität Paderborn <br/> Fakultät EIM-Informatik <br/> Warburger Str.
                            100 <br/> 33098 Paderborn
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </Layout>
);

export default Home
