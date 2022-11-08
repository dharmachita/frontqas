import './App.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Customers from './pages/Customers/Customers';
import NewCustomer from './pages/Customers/NewCustomer';
import CustomerDetailContainer from './pages/Customers/CustomerDetailContainer';
import CustomerEdit from './pages/Customers/CustomerEdit';
import Products from './pages/Products/Products';
import ProductsBuying from './pages/Products/ProductsBuying';
import ProductsPricing from './pages/Products/ProductsPricing';
import Orders from './pages/Orders/Orders';
import OrdersQuotas from './pages/Orders/OrdersQuotas';
import Refinanciacion from './pages/Orders/Refinanciacion';
import Anulacion from './pages/Orders/Anulacion';
import OrderRequest from './pages/Orders/OrderRequest';
import Reports from './pages/Reports/Reports';
import Setting from './pages/Settings/Settings';
import Users from './pages/Settings/Users';
import Rol from './pages/Settings/Rol';
import AdminComisiones from './pages/Admin/AdminComisiones';
import AdminCobros from './pages/Admin/AdminCobros';
import AdminLiq from './pages/Admin/AdminLiq';
import AdminEgresos from './pages/Admin/AdminEgresos';
import P404 from './pages/404';



function App() {
  return (
    <div>
    <Router>  
      <Dashboard title={"ServiConfort"}>
        <Switch>
          <Route exact path="/" component={Home}/> 
          <Route exact path="/clientes" component={Customers}/> 
          <Route exact path="/clientes/nuevo" component={NewCustomer}/> 
          <Route exact path="/clientes/:id" component={CustomerDetailContainer}/> 
          <Route exact path="/clientes/editar/:id" component={CustomerEdit}/> 

          <Route exact path="/productos" component={Products}/> 
          <Route exact path="/productos/compras" component={ProductsBuying}/> 
          <Route exact path="/productos/precios" component={ProductsPricing}/> 

          <Route exact path="/ventas" component={Orders}/>
          <Route exact path="/ventas/cuotas" component={OrdersQuotas}/> 
          <Route exact path="/ventas/refinanciacion" component={Refinanciacion}/> 
          <Route exact path="/ventas/anulacion" component={Anulacion}/> 
          <Route exact path="/ventas/pedidos" component={OrderRequest}/>  

          <Route exact path="/reportes" component={Reports}/> 

          <Route exact path="/configuracion/usuarios" component={Users}/> 
          <Route exact path="/configuracion/roles" component={Rol}/> 
          <Route exact path="/configuracion/general" component={Setting}/>

          <Route exact path="/gestiones/comisiones" component={AdminComisiones}/> 
          <Route exact path="/gestiones/cobros" component={AdminCobros}/> 
          <Route exact path="/gestiones/liquidaciones" component={AdminLiq}/>  
          <Route exact path="/gestiones/egresos" component={AdminEgresos}/>  

          <Route exact path="*" component={P404}/>
        </Switch>
      </Dashboard>
      </Router>
    </div>
  );
}

export default App;
