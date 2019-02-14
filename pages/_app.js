import React from 'react'
import {Provider} from 'react-redux'
import App, {Container} from 'next/app'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import {initStore} from '../store/store'

export default withRedux(initStore)(class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        return {
            pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
        }
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <Head>
                    <title>OPAL</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
                    <link rel="icon" type="image/png" href="../static/img/opal-favicon-32x32.png" sizes="32x32" />
                </Head>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
})
