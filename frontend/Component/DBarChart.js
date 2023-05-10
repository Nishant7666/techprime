import React from 'react';
import {useEffect, useState} from 'react';
import DBChart from './DBarChart.css';
import { Bar } from 'react-chartjs-2';
import
      {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      } from 'chart.js';      

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);


const options =
  {
    indexAxis:'x',
    elements:
    {
      bar: 
      {
        margin:'10',
        borderRadius:50,
      },
    },
    maintainAspectRatio: false ,
    plugins: 
    {
      legend: 
      {
        position: 'bottom',
      },
      title: 
      {
        display: true,
        text: 'Department wise - Total Vs Closed',       
      },
    },
  };

const Horizontalchart =() => 
{
  const [barCount,setBarCount] = useState 
  (
    {
      str:"0",
      strCount:"0",
      strPercent:"0",
  
      finCount:"0",
      finPercent:"0",
      fin:"0",
  
      qltCount:"0",
      qltPercent:"0",
      qlt:"0",
  
      manCount:"0",
      manPercent:"0",
      man:"0",
  
      stoCount:"0",
      stoPercent:"0",
      sto:"0",
  
      hrCount:"0",
      hrPercent:"0",
      hr:"0",  
    }
  )

  const [data1, setData1] = useState
  (
    {
      labels:['STR','FIN', 'QLT', 'MAN', 'STO', 'HR'],
      datasets:
        [
          {
            label: 'Total',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor:'rgb(5, 105, 199)',
            barThickness:'8',
           
          },
          {
            label: 'Closed',
            data:[],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor:'rgb(48, 204, 87)',
            barThickness:'8',
          },
        ],
    });

  useEffect(()=>
  {
    const fetchData= async()=>
    {
        const dataSet1 = [];
        const dataSet2 = [];
        fetch("http://localhost:8000/barGraph",
        {
          method: "GET",
        })
        .then((res) => res.json())
        .then((data) => 
        {
        console.log("bar data here",data);
        setData1({
            labels:['STR','FIN', 'QLT', 'MAN', 'STO', 'HR'],
            datasets: [
              {
                label:'Total',
                data:[
                      data.str,                         
                      data.fin,                          
                      data.qlt,                         
                      data.man,             
                      data.sto,                          
                      data.hr,                         
                    ],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(29, 91, 206)',
                borderRadius:100,
                borderRadiusBottom:10,
                
              },
              {
                label: 'Closed',
                data:[  
                        data.strCount,
                        data.finCount,
                        data.qltCount,
                        data.manCount,
                        data.stoCount,
                        data.hrCount,
                      ],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 235, 0.5)',
              },
            ],
          })
        console.log("arrData", dataSet1, dataSet2)
        })
      .catch(e =>
        {
            console.log("error", e)
        })
    }       
        fetchData();
  },[])
  
    return(
        <div  className='bar-chart' >
            {
                console.log("dataaaaaaaa", data1)
            }
            <Bar  data={data1} options={options}/>
         </div>)
}
export default Horizontalchart;
 