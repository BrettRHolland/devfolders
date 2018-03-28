import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import FoldersContainer from './components/FoldersContainer';
import FolderFormContainer from './components/FolderFormContainer';

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={FoldersContainer} />
      <Route path='/folders/new' component={FolderFormContainer} />
    </Router>
  )
}

export default App;