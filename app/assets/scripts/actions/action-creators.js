import fetch from 'isomorphic-fetch';
import * as actions from './action-types';
import config from '../config';

// ////////////////////////////////////////////////////////////////////////////
// //// Fetch Forms Thunk

function requestForms () {
  return {
    type: actions.REQUEST_FORMS
  };
}

function receiveForms (json) {
  return {
    type: actions.RECEIVE_FORMS,
    items: json.forms,
    receivedAt: Date.now()
  };
}

export function fetchForms () {
  return dispatch => {
    dispatch(requestForms());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`${config.api}/forms`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveForms(json));
      });

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}

// ////////////////////////////////////////////////////////////////////////////
// //// Fetch Forms Entries Thunk

function requestFormsEntries () {
  return {
    type: actions.REQUEST_FORMS_ENTRIES
  };
}

function receiveFormsEntries (json) {
  return {
    type: actions.RECEIVE_FORMS_ENTRIES,
    form: json.form,
    items: json.entries,
    receivedAt: Date.now()
  };
}

export function fetchFormsEntries (form) {
  return dispatch => {
    dispatch(requestFormsEntries());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`${config.api}/forms/${form}/entries`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFormsEntries(json));
      });

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}

// ////////////////////////////////////////////////////////////////////////////
// //// Fetch Forms Entries Thunk

function requestEntryFormData () {
  return {
    type: actions.REQUEST_ENTRY_FORM_DATA
  };
}

function receiveEntryFormData (json) {
  return {
    type: actions.RECEIVE_ENTRY_FORM_DATA,
    response: json,
    receivedAt: Date.now()
  };
}

export function fetchEntryFormData (form, entry) {
  return dispatch => {
    dispatch(requestEntryFormData());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`${config.api}/forms/${form}/entries/${entry}`)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveEntryFormData(json));
      });

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}

// ////////////////////////////////////////////////////////////////////////////
// //// Fetch Forms Entries Thunk

function startUpdateEntryFormData () {
  return {
    type: actions.START_UPDATE_ENTRY_FORM_DATA
  };
}

function finishUpdateEntryFormData (json) {
  return {
    type: actions.FINISH_UPDATE_ENTRY_FORM_DATA,
    response: json,
    receivedAt: Date.now()
  };
}

export function updateEntryFormData (form, entry, data) {
  return dispatch => {
    dispatch(startUpdateEntryFormData());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(`${config.api}/forms/${form}/entries/${entry}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => {
        dispatch(finishUpdateEntryFormData(json));
      });

      // In a real world app, you also want to
      // catch any error in the network call.
  };
}
