import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Coinpage from "./pages/Coinpage";
import Homepage from "./pages/Homepage";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#FFFFFF",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/coins/:id" component={Coinpage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
