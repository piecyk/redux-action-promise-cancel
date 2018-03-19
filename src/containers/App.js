import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateQuery, fetchQuery} from './../actions';

import debounce from 'lodash.debounce';

class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFetchQuery = this.onFetchQuery.bind(this);
    this.debounceFetchQuery = debounce(this.onFetchQuery, 200);
    // not everything need to be on redux store
    this.state = {
      isPending: false
    }
  }
  render() {
    const {query, resolvedData} = this.props;
    const {isPending} = this.state;
    return (
      <div>
        <h2>Test:</h2>
        <div style={{padding: 10}}>
          query:
          <input
            type={'text'}
            value={query}
            onChange={this.onChange}
          />
        </div>
        <div style={{padding: 15, fontSize: 18}}>
          {isPending ?
            <div>loading...</div>
            :
            resolvedData && <div>resolvedData: {resolvedData}</div>
          }
        </div>
      </div>
    )
  }
  onFetchQuery(query) {
    this.deffer = this.props.dispatch(fetchQuery(query));
    this.deffer.then(() => {
      this.setState({isPending: false});
      this.deffer = null
    }, () => {
      this.deffer = null
    })
  }
  onChange(e) {
    const {value} = e.target;
    this.props.dispatch(updateQuery(value));

    if (this.state.isPending !== true) {
      this.setState({isPending: true});
    }
    if (this.deffer) {
      this.deffer.cancel();
      this.deffer = null;
    }
    this.debounceFetchQuery(value);
  }
}

export default connect(s => s)(App)