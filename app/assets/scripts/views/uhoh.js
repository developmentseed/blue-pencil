'use strict';
import React from 'react';
import { Link } from 'react-router';

var UhOh = React.createClass({
  render: function () {
    return (
      <section className='page'>
        <header className='page__header'>
          <div className='inner'>
            <div className='page__headline'>
              <h1 className='page-title'>404 Not found</h1>
            </div>
          </div>
        </header>
        <div className='page__body'>
          <div className='inner'>
            <div className='page__content'>
              <p>UhOh that is a bummer. Try checking the <Link to='/'>form index</Link>.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = UhOh;
