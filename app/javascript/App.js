import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import FoldersContainer from './components/FoldersContainer';
import FolderFormContainer from './components/FolderFormContainer';
import MaterialsContainer from './components/MaterialsContainer';

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={FoldersContainer} />
      <Route path='/folders/new' component={FolderFormContainer} />
      <Route path="/folders/:id" component={MaterialsContainer} />
    </Router>
  )
}

export default App;
