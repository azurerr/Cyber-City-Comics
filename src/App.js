import './App.css';
import Comic from './Comic';
import Head from './Head';
import Footer from './Footer'
import NotFound from './NotFound';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header" >
        <Head />
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect push to={"/Comic"} />
          )} />
          <Route exact path="/Comic" render={() => (
            <Comic />
          )} />
          <Route path="/Comic/:id" render={(props) => (
            <Comic id={props.match.params.id} />
          )} />
          <Route render={() => (
            <NotFound />
          )} />
        </Switch>
      </BrowserRouter>
      <footer className="App-footer" >
        <Footer />
      </footer>
    </div>

  );
}

export default App;
