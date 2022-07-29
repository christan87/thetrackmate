import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Button } from 'react-bootstrap';
  import { Bar } from 'react-chartjs-2';
  import faker from '@faker-js/faker';
  import EnlargeModal from './EnlargeModal';
  //import demoTickets from '../../services/demoTickets';
  import { useUserData } from '../../contexts/UserDataContext';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

export default function BarGraph(props){
  const { userData } = useUserData()
  const tickets = userData.ticketsAll;
    const styles = {
      minHeight: `${props.minHeight}rem`,
      minWidth: `${props.minWidth}rem`,
      maxHeight: `${props.maxHeight}rem`,
      maxWidth: `${props.maxWidth}rem`
    }
    const labels2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
    const data2 = {
      labels: labels2,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    const [modalShow, setModalShow] = useState(false);
    function onHide(){
        setModalShow(false)
    }

    function onShow(){
        setModalShow(true)
    }

    let liveData = {
      labels: ["Tickets by Status"],
      datasets: [
        {
          label: "Open",
          data: [0],
          backgroundColor: "rgba(0,128,0,0.2)",
          borderColor:"rgb(0,128,0)",
          borderWidth: 1
        },
        {
          label: "In Progress...",
          data: [0],
          backgroundColor: "rgba(204,204,0,0.2)",
          borderColor:"rgb(204,204,0)",
          borderWidth: 1
        },
        {
          label: "Closed",
          data: [0],
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          borderColor:"rgb(255, 0, 0)",
          borderWidth: 1
        }
      
      ]
    }

    function dataProcess(tickets){
      let data;
      if(userData.mode === "live"){
        data = liveData;
      }else{
        data = {
          labels: ["Tickets by Status"],
          datasets: [
            {
              label: "Open",
              data: [4],
              backgroundColor: "rgba(0,128,0,0.2)",
              borderColor:"rgb(0,128,0)",
              borderWidth: 1
            },
            {
              label: "In Progress...",
              data: [1],
              backgroundColor: "rgba(204,204,0,0.2)",
              borderColor:"rgb(204,204,0)",
              borderWidth: 1
            },
            {
              label: "Closed",
              data: [7],
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              borderColor:"rgb(255, 0, 0)",
              borderWidth: 1
            }
          
          ]
        }
      }
      
      tickets.forEach(ticket => {
        if(ticket.status === "Open"){
          data.datasets[0].data[0]++;
        }else if(ticket.status === "In Progress..."){
          data.datasets[1].data[0]++;
        }else if(ticket.status === "Closed"){
          data.datasets[2].data[0]++;
        }
      });
      return data;
    }

    const processedData = dataProcess(tickets);

    return(
        <div>
            <Bar options={options} data={processedData} style={styles} />;
            <div class="d-grid gap-2 col-2 mx-auto">
              <Button variant="primary" onClick={onShow} className="btn btn-sm">
                  Enlarge
              </Button>
            </div>
            <EnlargeModal show={modalShow} onHide={onHide}>
              <Bar options={options} data={processedData} style={styles} />
            </EnlargeModal>
        </div>
    );
}