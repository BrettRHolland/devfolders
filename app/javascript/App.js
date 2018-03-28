import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import FoldersContainer from './components/FoldersContainer';

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={FoldersContainer} />
    </Router>
  )
}

export default App;