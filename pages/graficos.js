import Link from 'next/link';
import {Line} from 'react-chartjs-2';
import{
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';
const firebaseConfig = {
  apiKey: "AIzaSyAee0Xzeh91zc73FPnWvJO7dirBAqUWc7g",
  authDomain: "iscf---1.firebaseapp.com",
  databaseURL: "https://iscf---1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iscf---1",
  storageBucket: "iscf---1.appspot.com",
  messagingSenderId: "702109146022",
  appId: "1:702109146022:web:a10ee93c88cc403fab4d67",
  measurementId: "G-1KY1KHYJZB"
};
const app = initializeApp(firebaseConfig);
const CoppeliaData = getDatabase(app);

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)


export default function Graficos() {
  let router = useRouter()

  /********* Criar um update em realtime **********/
  const [delay, setDelay] = useState(1000);
  const [count, setCount] = useState(0);
  const [xArray, setUpdate1] = useState([]);
  const [yArray, setUpdate2] = useState([]); 
  const [zArray, setUpdate3] = useState([]); 
 // const [timeArray, setUpdate4] = useState([]);
  // Increment the counter.
  useInterval(() => {
   // setCount(count + 1);
    setUpdate1(xData.map(Number));
    setUpdate2(yData.map(Number));
    setUpdate3(zData.map(Number));
  }, delay);

  const [prevUpdated, setPrevUpdated] = useState(1);
  useInterval(() => {
    if(prevUpdated!= updated){
      setDelay((delay/prevUpdated) * updated);
      setPrevUpdated(updated);
    }

  }, 1000);
  

  let xData = [];
  let yData = [];
  let zData = [];
  let timestamps = []

  //let xArray = [];
  //let yArray = [];
  //let zArray = [];
  let timeArray = [];

  /******* buscar os dados ao firebase sempre que houver modificação e retirar tudo o que não é dados para usar  *************/
  const accelRef = ref(CoppeliaData, 'accel'); 
  onValue(accelRef, (snapshot) => {
    const data = snapshot.val();       
    if (data) {
      console.log(data)
      Object.keys(data).forEach((key) => {
        timestamps.push(data[key].data.timestamp);
        xData.push(data[key].data.x);
        yData.push(data[key].data.y); 
        zData.push(data[key].data.z);
       // const transformedData = `timestamp:${data[key].data.timestamp}\nx:${data[key].data.x}\ny:${data[key].data.y}\nz:${data[key].data.z}`;
        
      });
    } else {
      console.log("Data is null");
    }
  }, (error) => { console.error(error); }
  );

 // xArray = xData.map(Number);
 // yArray = yData.map(Number);
 // zArray = zData.map(Number);
  timeArray = timestamps.map(Number).map(num => num.toFixed(2)).map(number => number.toString());

  console.log( zArray);




  const inputRef = useRef(null);

  const [updated, setUpdated] = useState('1');

  const handleClick = () => {
    // "inputRef.current.value" is input value
    setUpdated(inputRef.current.value);
  };




  const graphx = {
    labels: timeArray,
    datasets: [{
      data: xArray,
      backgroundColor: 'red',
      pointBorderColor: 'transparent',
      pointBorderWidth: 2,
      tension: 0.2
    }]
  }
  const graphy = {
    labels: timeArray,
    datasets: [{
      data: yArray,
      backgroundColor: 'purple',
      pointBorderColor: 'transparent',
      pointBorderWidth: 4,
      tension: 0.2
    }]
  }
  const graphz = {
    labels: timeArray,
    datasets: [{
      data: zArray,
      backgroundColor: 'blue',
      pointBorderColor: 'transparent',
      pointBorderWidth: 4,
      tension: 0.2
    }]
  }
  const options1 = {
    plugins:{
      legend: false
    },
    scales:{
      x: {
        grind:{
          display: false
        }
      },
      y: {
          min: -10.4,
          max: -9.2,
          ticks:{
            callback: (value) => value
          },
      }
    },
  };
  const options2 = {
    plugins:{
      legend: false
    },
    scales:{
      x: {
        grind:{
          display: false
        }
      },
      y: {
          min: 0,
          max: 1.6,
          ticks:{
            callback: (value) => value
          },

      }
    }
  };
  const options3 = {
    plugins:{
      legend: false
    },
    scales:{
      x: {
        grind:{
          display: false
        }
      },
      y: {
          min: -1,
          max: 1,
          ticks:{
          //  stepSize: 2,
            callback: (value) => value
          },
      /*    grid:{
            borderDash: 10
          }*/
      }
    }
  };

  return (
    
    <div style={{width: '1000px', heigh:'1000px', marginLeft: '20px'}}>
      <h1>
        <Link href="/" id="myLink" style={{fontSize: '1rem'}} >Voltar atrás</Link>
        
        <a style={{fontSize: '1rem', marginLeft:'20px', marginRight:'10px'}} >Coloque na caixa a velocidade que quer reverber dados (1 / 2 / 3 / ...):</a>
        <input
          ref={inputRef}
          type="text"
          id="message"
          name="message"
          defaultValue="1"

        />
        <button onClick={handleClick}>Update</button>
        <a>Updated: {delay} {prevUpdated}</a>
      </h1>
      <Line data = {graphx} options = {options1} ></Line>
      <Line data = {graphy} options = {options2} ></Line>
      <Line data = {graphz} options = {options3} ></Line>
    </div>
  
  )
}

/************** Funcao para criar o update em realtime ***************/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}