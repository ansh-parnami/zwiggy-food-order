import Header from "./components/Headers";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import {CartContextProvider} from "./Store/CartContext";
import { UserProgressContextProvider } from "./Store/UserProgressContext";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
    <Header></Header>
    <Meals></Meals>
      <Cart />
      <Checkout></Checkout>
    
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
