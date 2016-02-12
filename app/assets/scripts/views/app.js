'use strict';
import React from 'react';

var App = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.object
  },

  render: function () {
    return (
      <div>
        <header className='site-header' role='banner'>
          <div className='inner'>
            <div className='site-headline'>
              <h1 className='site-title'>
                <a href='/' title='Visit homepage'>
                  Blue Pencil
                </a>
              </h1>
            </div>
          </div>
        </header>

        <main className='site-body' role='main'>
          <div className='inner'>
            {this.props.children}
          </div>
        </main>

        <footer className='site-footer' role='contentinfo'>
          <div className='inner'>
            <p>Made with love by <a href='https://developmentseed.org' title='Visit Development Seed website'>Development Seed</a> &middot; 2016</p>
          </div>
        </footer>
      </div>
    );
  }
});

module.exports = App;
