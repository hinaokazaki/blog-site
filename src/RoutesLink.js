import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RouterNav from './RouterNav';
import Main from './Main';
import Contact from './Contact';

const routesLink = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RouterNav />}>
            <Route path="/main" element={<Main />} />
            <Route path="/contact" element={<Contact />} />
        </Route>
    )
);

export default routesLink;