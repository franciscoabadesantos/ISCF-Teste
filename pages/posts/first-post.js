// JavaScript source code
import Link from 'next/link';
import {Line} from 'react-chartjs-2';
import{
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'
import { app, database } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useRouter } from 'next/router';


Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

export default function Graficos() {
  const databaseCoppelia = collection(database, 'accel');
  let router = useRouter()

  const data = {
    labels: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17"],
    datasets: [{
      data: [8,7.8,6,8,7,5,6],
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointBorderWidth: 4,
      tension: 0.2
    }]
  }
  const options = {
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
          min: 2,
          max: 10,
          ticks:{
            stepSize: 2,
            callback: (value) => value + 'K'
          },
          grid:{
            borderDash: 10
          }
      }
    }
  };

  return (
    
    <div style={{width: '500px', heigh:'500px', marginLeft: '20px'}}>
      <h1>
        <Link href="/" id="myLink">Voltar </Link>
      </h1>
      <Line data = {data} options = {options}></Line>
      <Line data = {data} options = {options}></Line>
      <Line data = {data} options = {options}></Line>
    </div>
  
  )
}