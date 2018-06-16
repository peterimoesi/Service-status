import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';

import pages from './pages';
import { saveData } from './globalActions';

class NewService extends React.Component {
    static getDerivedStateFromProps(props, state) { // new react lifecycle method replacing componentWillRecieveProps. resettng state service
        if (props.page !== state.page) {
            return {
                page : props.page,
                service : {
                    name : ''
                }
            };
        }
        return null;
    }
    constructor() {
        super();
        this.state = {
            showForm : false,
            service : {
                name : ''
            }
        };
        this.onChange = this.onChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.saveService = this.saveService.bind(this);
    }

    onChange(e) {
        const { service } = this.state;
        if (e.target.type === 'checkbox') {
            // form data is hard coded to accept input with name attibute if "name" or checkbox
            service[e.target.name] = e.target.checked ? 'operational' : 'faulty';
        } else {
            service[e.target.name] = e.target.value;
        }
        this.setState({ service });
    }

    toggleForm() {
        // render or close the from component
        this.setState({ showForm : !this.state.showForm }, () => {
            // reset the form data
            this.setState({ service : {
                name : ''
            } });
        });
    }

    saveService() {
        // save new service with unique id
        this.props.saveData({...this.state.service, id : shortId.generate() });
    }

    render() {
        return (
            <div className="service-form-cont">
                <div className="new-service-btn">
                    <button
                        className="btn btn-primary"
                        onClick={this.toggleForm}
                    >
                        { this.state.showForm ? 'Close' : 'New Service'}
                    </button>
                </div>
                {this.state.showForm ?
                    <div className="service-form">
                        <div className="form-group col-6 margin-auto">
                            <label htmlFor="page-title">Page name</label>
                            <input
                                value={pages[this.props.page].pageName}
                                className="form-control"
                                id="page-title"
                                disabled
                            />
                        </div>
                        <div className="row">
                            {
                            // get all neccessary fields from page object
                                Object.keys(pages[this.props.page].table).map(key => (
                                    <div className={`col-4 ${key !== 'name' ? 'form-check flex-item' : 'form-group'}`} key={key}>
                                        <label htmlFor={key} className={key !== 'name' ? 'form-check-label' : ''}>
                                            {key === 'name' ? key.charAt(0).toUpperCase() + key.slice(1) : ''}
                                        </label>
                                        <input
                                            className={key !== 'name' ? 'form-check-input' : 'form-control'}
                                            id={key}
                                            type={key !== 'name' ? 'checkbox' : 'text'}
                                            value={this.state.service[key]}
                                            name={key}
                                            onChange={this.onChange}
                                            checked={this.state.service[key] === 'operational'}
                                        />
                                        {key !== 'name' ? `${key.charAt(0).toUpperCase() + key.slice(1)} - Operational` : ''}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="new-service-btn">
                            <button
                                className="btn btn-success"
                                onClick={this.saveService}
                            >
                            Save
                            </button>
                        </div>
                    </div> : null }
            </div>
        );
    }
}

NewService.propTypes = {
    page : PropTypes.string.isRequired,
    saveData : PropTypes.func.isRequired
};

export default connect(null, { saveData })(NewService);
