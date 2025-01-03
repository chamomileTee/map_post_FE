import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import List from "./List";
import MemoDetail from "./List/MemoDetail";
import User from "./User";
import Group from "./Group";
import SignUp from "./SignUp";
import Login from "./Login";
import MainLayout from "~/layout/MainLayout";

const Router = () => {
  return <BrowserRouter>
    <Routes>
        <Route path = "/signup" element={<SignUp/>}></Route>
        <Route path = "/login" element={<Login/>}></Route>
        <Route path = "/*" element={<MainLayout/>}>
            <Route path = "Home" element={<Home/>}></Route>
            <Route path = "list" element={<List/>}></Route>
            <Route path = "list/:id" element={<MemoDetail/>}></Route>
            <Route path = "user" element={<User/>}></Route>
            <Route path = "group" element={<Group/>}></Route>
        </Route>
    </Routes>
  </BrowserRouter>
}

export default Router;