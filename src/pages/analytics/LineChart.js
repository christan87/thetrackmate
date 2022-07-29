import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from '@faker-js/faker';
import { Button } from 'react-bootstrap';
import EnlargeModal from './EnlargeModal';
// import demoProjects from '../../services/demoProjects';
// import demoTickets from '../../services/demoTickets';
import { useUserData } from '../../contexts/UserDataContext';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Pojects by ticket status',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function dataProcess(projects, userData){

  let data;

  let liveData = {
    labels: ["Open Tickets", "In Progress Tickets", "Closed Tickets"],
    datasets: [
      {
        label: "Open Projects",
        data: [0, 0, 0],
        borderColor: "rgb(0,128,0)",
        backgroundColor: "rgba(0,128,0,0.5)"
      },
      {
        label: "In Progress Projects",
        data: [0, 0, 0],
        borderColor: "rgb(204,204,0)",
        backgroundColor: "rgba(204,204,0,0.5)"
      },
      {
        label: 'Closed Projects',
        data: [0, 0, 0],
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(255, 0, 0, 0.5)"
      }
    ]
  }

  if(userData.mode === "live"){
    data = liveData;
  }else{
    data = {
      labels: ["Open Tickets", "In Progress Tickets", "Closed Tickets"],
      datasets: [
        {
          label: "Open Projects",
          data: [3, 1, 0],
          borderColor: "rgb(0,128,0)",
          backgroundColor: "rgba(0,128,0,0.5)"
        },
        {
          label: "In Progress Projects",
          data: [7, 1, 4],
          borderColor: "rgb(204,204,0)",
          backgroundColor: "rgba(204,204,0,0.5)"
        },
        {
          label: 'Closed Projects',
          data: [4, 1, 7],
          borderColor: "rgb(255, 0, 0)",
          backgroundColor: "rgba(255, 0, 0, 0.5)"
        }
      ]
    }

  }

  projects.forEach(project => {
    if(project.status === "Open"){
      project.tickets.forEach(ticket=>{
        if(ticket.status === "Open"){
          data.datasets[0].data[0]++;
        }else if(ticket.status === "In Progress..."){
          data.datasets[0].data[1]++;
        }else if(ticket.status === "Closed"){
          data.datasets[0].data[2]++;
        }
      })
    }else if(project.status === "In Progress..."){
      project.tickets.forEach(ticket=>{
        if(ticket.status === "Open"){
          data.datasets[1].data[0]++;
        }else if(ticket.status === "In Progress..."){
          data.datasets[1].data[1]++;
        }else if(ticket.status === "Closed"){
          data.datasets[1].data[2]++;
        }
      })
    }else if(project.status === "Closed"){
      project.tickets.forEach(ticket=>{
        if(ticket.status === "Open"){
          data.datasets[2].data[0]++;
        }else if(ticket.status === "In Progress..."){
          data.datasets[2].data[1]++;
        }else if(ticket.status === "Closed"){
          data.datasets[2].data[2]++;
        }
      })
    }
  });

  return data;
}


export default function LineChart(props) {

  const [modalShow, setModalShow] = useState(false);
  const { userData } = useUserData()

  const processedData = dataProcess(userData.projectsAll, userData);

  function onHide(){
      setModalShow(false)
  }

  function onShow(){
      setModalShow(true)
  }

  const styles = {
    minHeight: `${props.minHeight}rem`,
    minWidth: `${props.minWidth}rem`,
    maxHeight: `${props.maxHeight}rem`,
    maxWidth: `${props.maxWidth}rem`
  }
  return(
    <div>
      <Line options={options} data={processedData} style={styles}/>
      <div class="d-grid gap-2 col-2 mx-auto">
        <Button variant="primary" onClick={onShow} className="btn btn-sm">
            Enlarge
        </Button>
      </div>
      <EnlargeModal show={modalShow} onHide={onHide}>
        <Line options={options} data={processedData} style={styles} />
      </EnlargeModal>
    </div>
  );
}