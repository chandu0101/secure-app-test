import React, { Component } from 'react';
import './App.scss';
import AppHeader from './components/AppHeader';
import { Content } from 'carbon-components-react/es/components/UIShell';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';

class App extends Component {
  render() {
    return (
      <>
        <AppHeader />
        <Content className="app-content">
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
