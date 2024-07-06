import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Account from "./components/Account/Account";
import AdminPage from './components/AdminPage/AdminPage';
import AuthPage from './components/AuthPage/AuthPage';

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProductList />}/>
                <Route path={'form'} element={<Form />}/>
                <Route path={'adminPage'} element={<AdminPage />}/>
                {/* <Route path={'authPage'} element={<AuthPage />}/> */}
                {/* <Route path={'account'} element={<Account />}/> */}
                
            </Routes>
        </div>
    );
}

export default App;
