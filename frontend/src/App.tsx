import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* My components */
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Chat from "./screens/Chat";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/" exact component={HomeScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart" component={CartScreen} />
              <Route path="/chat" component={Chat} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
