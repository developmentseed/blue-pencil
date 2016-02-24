import _ from 'lodash';
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import * as actions from '../actions/action-types';

const forms = function (state = {items: [], fetching: false, fetched: false}, action) {
  switch (action.type) {
    case actions.REQUEST_FORMS:
      console.log('REQUEST_FORMS');
      state = _.cloneDeep(state);
      state.fetching = true;
      break;
    case actions.RECEIVE_FORMS:
      console.log('RECEIVE_FORMS');
      state = _.cloneDeep(state);
      state.items = action.items;
      state.fetching = false;
      state.fetched = true;
      break;
  }
  return state;
};

const formEntries = function (state = {items: [], fetching: false, fetched: false}, action) {
  switch (action.type) {
    case actions.REQUEST_FORMS_ENTRIES:
      console.log('REQUEST_FORMS_ENTRIES');
      state = _.cloneDeep(state);
      state.fetching = true;
      break;
    case actions.RECEIVE_FORMS_ENTRIES:
      console.log('RECEIVE_FORMS_ENTRIES');
      state = _.cloneDeep(state);
      state.items = action.items;
      state.form = action.form;
      state.fetching = false;
      state.fetched = true;
      break;
  }
  return state;
};

const defaultEntryFormDataState = {
  form: '',
  entry: '',
  schema: {},
  meta: {},
  data: {},
  entryName: '',
  fetching: false,
  fetched: false,
  dataUpdate: {
    updating: false,
    statusCode: null,
    message: null
  }
};
const entryFormData = function (state = defaultEntryFormDataState, action) {
  switch (action.type) {
    case actions.REQUEST_ENTRY_FORM_DATA:
      console.log('REQUEST_ENTRY_FORM_DATA');
      state = _.cloneDeep(state);
      state.fetching = true;
      state.dataUpdate.updating = false;
      state.dataUpdate.statusCode = null;
      state.dataUpdate.message = null;
      break;
    case actions.RECEIVE_ENTRY_FORM_DATA:
      console.log('RECEIVE_ENTRY_FORM_DATA');
      state = _.cloneDeep(state);
      state.form = action.response.form;
      state.entry = action.response.entry;
      state.schema = action.response.schema;
      state.meta = action.response.meta;
      state.entryName = action.response.entryName;
      state.data = action.response.data;
      state.fetching = false;
      state.fetched = true;
      break;
    case actions.START_UPDATE_ENTRY_FORM_DATA:
      console.log('START_UPDATE_ENTRY_FORM_DATA');
      state = _.cloneDeep(state);
      state.dataUpdate.updating = true;
      state.dataUpdate.statusCode = null;
      state.dataUpdate.message = null;
      break;
    case actions.FINISH_UPDATE_ENTRY_FORM_DATA:
      console.log('FINISH_UPDATE_ENTRY_FORM_DATA');
      state = _.cloneDeep(state);
      state.dataUpdate.updating = false;
      state.dataUpdate.statusCode = action.response.statusCode;
      state.dataUpdate.message = action.response.message;
      console.log('state.dataUpdate', state.dataUpdate);
      break;
  }
  return state;
};

export default combineReducers({
  forms,
  formEntries,
  entryFormData,
  routing: routeReducer
});
