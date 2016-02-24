'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Form from 'react-jsonschema-form';
import _ from 'lodash';
import { fetchEntryFormData, updateEntryFormData } from '../actions/action-creators';

var Entry = React.createClass({
  displayName: 'Entry',

  propTypes: {
    dispatch: React.PropTypes.func,
    _fetchEntryFormData: React.PropTypes.func,
    _updateEntryFormData: React.PropTypes.func,
    dataFetching: React.PropTypes.bool,
    dataFetched: React.PropTypes.bool,
    form: React.PropTypes.string,
    entryName: React.PropTypes.string,
    entry: React.PropTypes.string,
    schema: React.PropTypes.object,
    formdata: React.PropTypes.object,
    meta: React.PropTypes.object,
    params: React.PropTypes.shape({
      form: React.PropTypes.string,
      entry: React.PropTypes.string
    }),
    dataUpdate: React.PropTypes.shape({
      updating: React.PropTypes.bool,
      statusCode: React.PropTypes.number,
      message: React.PropTypes.string
    })
  },

  getInitialState: function () {
    return {
      formdata: {}
    };
  },

  componentDidMount: function () {
    this.props._fetchEntryFormData(this.props.params.form, this.props.params.entry);
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.formdata !== nextProps.formdata) {
      this.setState({formdata: nextProps.formdata});
    }
  },

  onFormChange: function (data) {
    // console.log('onFormChange', arguments);
    this.setState({formdata: data.formData});
  },

  onFormSubmit: function (data) {
    if (!this.props.dataUpdate.updating) {
      let d = {
        author: data.formData.author,
        form: this.props.form,
        entry: this.props.entry,
        meta: this.props.meta,
        data: _.omit(data.formData, 'author')
      };

      this.props._updateEntryFormData(this.props.form, this.props.entry, d);
    }
  },

  onFormError: function () {
    console.log('onFormError', arguments);
  },

  renderContent: function () {
    if (this.props.dataUpdate.updating) {
      return <p>Your data is being submitted...</p>;
    }

    if (this.props.dataFetching) {
      return <p>Preparing form... This may take a while.</p>;
    }

    if (this.props.dataUpdate.statusCode !== null && this.props.dataUpdate.statusCode === 200) {
      return (
        <div>
          <h2>Thank you for the collaboration</h2>
          <div className='alert alert--success alert--popover' role='alert'>
            <strong>Success:</strong> The data was successfully submitted.
          </div>
        </div>
      );
    }

    let schema = this.props.schema;
    if (schema.properties) {
      schema.properties.author = {
        title: 'User information (Optional)',
        description: 'This is used to identify the author of the changes.',
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string',
            description: 'Anonymous'
          },
          email: {
            title: 'Email',
            type: 'string',
            description: 'anonymous@example.com'
          }
        }
      };
    }

    let uiSchema = {};
    _.forEach(schema.properties, (o, i) => {
      if (o.properties) {
        uiSchema[i] = {
          classNames: 'field-user-info'
        };
      }
      if (o.enum) {
        uiSchema[i] = {
          classNames: 'field-select'
        };
      }
    });

    return (
      <div className='form-entry-form-wrapper'>
        <Form schema={schema}
          formData={this.state.formdata}
          uiSchema={uiSchema}
          onChange={this.onFormChange}
          onSubmit={this.onFormSubmit}
          onError={this.onFormError}>
            <button type='submit' className='button button--primary-outline'>Submit</button>
        </Form>
        {this.props.dataUpdate.statusCode !== null && this.props.dataUpdate.statusCode !== 200 ? (
          <div className='alert alert--danger alert--popover' role='alert'>
            <strong>Error:</strong> {this.props.dataUpdate.message}
            <p>Please try again.</p>
          </div>
        ) : null}
      </div>
    );
  },

  render: function () {
    if (!this.props.dataFetched && !this.props.dataFetching) {
      return null;
    }

    return (
      <section className='page page--semi-full'>
        <header className='page__header'>
          <div className='inner'>
            <div className='page__headline'>
              <p className='page-suptitle'><Link to='/'>Form</Link> / <Link to={`/forms/${this.props.form}`}>{this.props.params.form}</Link></p>
              <h1 className='page-title'>{this.props.entryName || this.props.params.entry}</h1>
            </div>
          </div>
        </header>
        <div className='page__body'>
          <div className='inner'>
            <div className='page__content'>
            {this.renderContent()}
            </div>
          </div>
        </div>
      </section>
    );
  }
});

// /////////////////////////////////////////////////////////////////// //
// Connect functions

function selector (state) {
  return {
    form: state.entryFormData.form,
    entry: state.entryFormData.entry,
    schema: state.entryFormData.schema,
    meta: state.entryFormData.meta,
    entryName: state.entryFormData.entryName,
    formdata: state.entryFormData.data,
    dataFetching: state.entryFormData.fetching,
    dataFetched: state.entryFormData.fetched,
    dataUpdate: state.entryFormData.dataUpdate
  };
}

function dispatcher (dispatch) {
  return {
    _fetchEntryFormData: (form, entry) => dispatch(fetchEntryFormData(form, entry)),
    _updateEntryFormData: (form, entry, data) => dispatch(updateEntryFormData(form, entry, data))
  };
}

module.exports = connect(selector, dispatcher)(Entry);
