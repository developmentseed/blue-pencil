'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchFormsEntries } from '../actions/action-creators';

var Form = React.createClass({
  displayName: 'Form',

  propTypes: {
    dispatch: React.PropTypes.func,
    _fetchFormsEntries: React.PropTypes.func,
    entriesFetching: React.PropTypes.bool,
    entriesFetched: React.PropTypes.bool,
    form: React.PropTypes.string,
    entries: React.PropTypes.array,
    params: React.PropTypes.shape({
      form: React.PropTypes.string
    })
  },

  componentDidMount: function () {
    this.props._fetchFormsEntries(this.props.params.form);
  },

  render: function () {
    if (!this.props.entriesFetched && !this.props.entriesFetching) {
      return null;
    }

    return (
      <section className='page'>
        <header className='page__header'>
          <div className='inner'>
            <div className='page__headline'>
              <p className='page-suptitle'><Link to='/'>Form</Link></p>
              <h1 className='page-title'>{this.props.params.form}</h1>
            </div>
          </div>
        </header>
        <div className='page__body'>
          <div className='inner'>
            <div className='page__content'>

              {this.props.entriesFetching ? <p>Loading form entries</p> : (
              <div>
                <ul className='card-entries'>
                  {this.props.entries.map(o => {
                    return (
                      <li key={o.name} className='card--entry-wrapper'>
                        <article className='card card--entry'>
                          <Link to={`/forms/${this.props.form}/${o.id}`} className='card__contents'>
                            <h1 className='card__title'>{o.name}</h1>
                          </Link>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
              )}

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
    form: state.formEntries.form,
    entries: state.formEntries.items,
    entriesFetching: state.formEntries.fetching,
    entriesFetched: state.formEntries.fetched
  };
}

function dispatcher (dispatch) {
  return {
    _fetchFormsEntries: (form) => dispatch(fetchFormsEntries(form))
  };
}

module.exports = connect(selector, dispatcher)(Form);
