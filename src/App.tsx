import { FormEvent, useEffect, useState } from "react";

import "./App.css";
import { ITask, tasks as data } from "./data/tasks";
import Container from "@mui/material/Container";
import { AddEdit } from "./components/orders/AddEdit";
import ListOrders from "./components/orders/ListOrders";



import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import LiskProducts from "./components/products/LiskProducts";

function App() {
  const [count, setCount] = useState<number>(0);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setTasks(data);
    setCount(data.length);
  }, []);

  const createTask = (task: ITask) => {
    setTasks([...tasks, task]);
    setCount(count + 1);
  };
  return (
    <div className="App">
      <Router >
        
        <Container className="card">
        <Sidebar></Sidebar>
          <Routes>
            <Route path="/" element={<Navigate replace to="/orders" />}></Route>
            <Route path="/orders" element={<ListOrders />}></Route>
            <Route path="/orders/addedit" element={< AddEdit/>}></Route>
            <Route path="/orders/addedit/:id" element={< AddEdit/>}></Route>
            <Route path="/products" element={<LiskProducts/>}></Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
