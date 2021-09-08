import "./App.css";
import Main from "./components/Main";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <ToastContainer />
      <Main />
    </>
  );
}

export default App;
