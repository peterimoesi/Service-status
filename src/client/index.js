import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getData,
    clearData
} from './globalActions';
import pages from './pages.js';
import NewService from './newService';
import shortId from 'shortid';

import './styles.css';

class IndexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.interval = setInterval(this.getData, 1000 * 60 * 10); // refresh data every 10mins
        this.state = {
            page : 'dataDog'
        };
    }
    componentDidMount() {
        this.props.getData(this.state.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.props.getData(this.state.page);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.props.clearData();
    }

    getData() {
        this.props.getData(this.state.page);
    }

    onChangePage(page) {
        this.setState({ page });
    }

    render () {
        return (
            <div>
                <div className="head-section">
                    <div className="head-title">
                        <h1>Status pages</h1>
                    </div>
                    <div className="page-title">
                        {pages[this.state.page].pageName}
                    </div>
                </div>
                <div className="container">
                    <div className="app-page-change">
                        {
                            Object.keys(pages).map(page => (
                                <div
                                    key={page}
                                    className={this.state.page === page ? 'page-active' : ''}
                                    onClick={() => this.onChangePage(page)}
                                >
                                    {pages[page].pageName}
                                </div>
                            ))
                        }
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    {
                                        Object.keys(pages[this.state.page].table).map(row => (
                                            <td key={row} colSpan={pages[this.state.page].table[row]}>
                                                {row}
                                            </td>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.statusData.map(data => (
                                        <tr key={data.id || shortId.generate()}>
                                            {
                                                Object.keys(pages[this.state.page].table).map(row => (
                                                    <td key={row} colSpan={pages[this.state.page].table[row]} className={data[row] || 'faulty'}>
                                                        <span>{data[row] || 'faulty'}</span>
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <NewService
                        page={this.state.page}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ statusData }) {
    return {
        statusData : statusData.data
    };
}

IndexScreen.propTypes = {
    statusData : PropTypes.array.isRequired,
    getData : PropTypes.func.isRequired,
    clearData : PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getData, clearData })(IndexScreen);
