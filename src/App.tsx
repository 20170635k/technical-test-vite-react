import { FormEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ITask, tasks as data } from "./data/tasks";
import Container from '@mui/material/Container'
import { AddEdit } from "./components/orders/AddEdit";
import { IOrderResponse } from "./utils/interfaces/order.interface";



function App() {

  let orderTest:IOrderResponse = {
    id: 1,
    orderNumber: 3,
    date: "18/09/2017",
    countProducts: 3,
    finalPrice: 45.5,
    products: [
      {
        id: 1,
        name: "Potato",
        unitPrice: 15.2,
        quantity: 4,
        total: 15.2 * 4,
      },
      {
        id: 2,
        name: "Tomato",
        unitPrice: 15.2,
        quantity: 4,
        total: 15.2 * 4,
      },
      {
        id: 3,
        name: "Banana",
        unitPrice: 15.2,
        quantity: 4,
        total: 15.2 * 4,
      },
    ]
  }

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
      <Container className="card">
        <AddEdit edit = {true} order={orderTest}/>
      </Container>
    </div>
  );
}

export default App;
