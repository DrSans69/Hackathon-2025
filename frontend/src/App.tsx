import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/home/Home';
import NotFound from './components/pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
