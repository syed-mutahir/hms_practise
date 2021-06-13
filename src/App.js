import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CustomerBooking from './pages/CustomerBooking.jsx';
import Seller from './pages/Seller.jsx';
import Customer from './pages/Customer.jsx';
import SellerBooking from './pages/SellerBooking.jsx'


function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route exact path='/Seller' component={Seller} /> 
        <Route exact path='/Customer' component={Customer} /> 
        <Route exact path='/CustomerBooking' component={CustomerBooking} /> 
        <Route exact path='/SellerBooking' component={SellerBooking} /> 
      </Switch>
    </div>

  );
}

export default App;
