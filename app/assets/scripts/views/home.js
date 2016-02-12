'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchForms } from '../actions/action-creators';

var Home = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    _fetchForms: React.PropTypes.func,
    formsFetching: React.PropTypes.bool,
    formsFetched: React.PropTypes.bool,
    forms: React.PropTypes.array
  },

  componentDidMount: function () {
    this.props._fetchForms();
  },

  render: function () {
    if (!this.props.formsFetched && !this.props.formsFetching) {
      return null;
    }

    return (
      <section className='page'>
        <header className='page__header'>
          <div className='inner'>
            <div className='page__headline'>
              <h1 className='page-title'>Forms</h1>
            </div>
          </div>
        </header>
        <div className='page__body'>
          <div className='inner'>
            <div className='page__content'>

              {this.props.formsFetching ? <p>Loading forms...</p> : (
              <div>
                <ul className='card-entries'>
                  {this.props.forms.map(o => {
                    return (
                      <li key={o.name} className='card--form-wrapper'>
                        <article className='card card--form'>
                          <Link to={`/forms/${o.name}`} className='card__contents'>
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
    forms: state.forms.items,
    formsFetching: state.forms.fetching,
    formsFetched: state.forms.fetched
  };
}

function dispatcher (dispatch) {
  return {
    _fetchForms: () => dispatch(fetchForms())
  };
}

module.exports = connect(selector, dispatcher)(Home);
