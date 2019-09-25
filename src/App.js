import React, { Component } from 'react';
import {Router, Route} from 'react-enroute';

//  Components
import QueryContainer from './components/QueryContainer';
import Main from './components/Main';
import NotFound from './components/NotFound';
import Settings from './components/Settings';
import History from './components/History';

const getHash = hash => {
  if (typeof hash === 'string' && hash.length > 0) {
    if (hash.substring(0, 1) === '#') {
      return hash.substring(1);
    }
    return hash;
  }
  return '/';
};

class App extends Component {

  constructor(){
    super();
    this.state = {
      location: getHash(window.location.hash)
    };

    //  Bind our events: 
    this.hashChangeHandler = this.hashChangeHandler.bind(this);
  }

  hashChangeHandler(e) {
    this.setState({
        location: getHash(window.location.hash)
    });
  }

  componentDidMount(){    
    //  Add a hash change listener:
    window.addEventListener("hashchange", this.hashChangeHandler);
  }

  render() {

    return (
      <Router {...this.state}>
        <Route path="" component={QueryContainer} >
          <Route path="/" component={Main} />
          <Route path="/query/:server" component={Main} />
          <Route path="/query/:server/:database" component={Main} />
          <Route path="/query/:server/:database/:expression" component={Main} />
        </Route>        

        <Route path="/history" component={History} />
        <Route path="/settings" component={Settings} />
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}

export default App;
