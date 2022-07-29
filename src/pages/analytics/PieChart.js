import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import EnlargeModal from './EnlargeModal';
// import demoTickets from '../../services/demoTickets';
import { useUserData } from '../../contexts/UserDataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Tickets by status - Chart.js Pie Chart',
    },
  },
};

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function dataProcess(tickets, userData){
  let data;
  let demoData = {
    labels: ["Open", "In Progress...", "Closed"],
    datasets: [
      {
        label: '# of Tickets',
        data: [4, 1, 7],
        backgroundColor: ["rgba(0,128,0,0.2)", "rgba(204,204,0,0.2)", "rgba(255, 0, 0, 0.2)"],
        borderColor: ["rgb(0,128,0)", "rgb(204,204,0)", "rgb(255, 0, 0)"],
        borderWidth: 1
      }
    ]
  }

  let liveData={
    labels: ["Open", "In Progress...", "Closed"],
    datasets: [
      {
        label: '# of Tickets',
        data: [0, 0, 0],
        backgroundColor: ["rgba(0,128,0,0.2)", "rgba(204,204,0,0.2)", "rgba(255, 0, 0, 0.2)"],
        borderColor: ["rgb(0,128,0)", "rgb(204,204,0)", "rgb(255, 0, 0)"],
        borderWidth: 1
      }
    ]
  }

  if(userData.mode === "live"){
    data = liveData;
  }else{
    data = demoData;
  }

  tickets.forEach(ticket => {
    if(ticket.status === "Open"){
      data.datasets[0].data[0]++;
    }else if(ticket.status === "In Progress..."){
      data.datasets[0].data[1]++;
    }else if(ticket.status === "Closed"){
      data.datasets[0].data[2]++;
    }
  });
  return data;
}


export default function PieChart(props) {

  const [modalShow, setModalShow] = useState(false);
  const { userData } = useUserData()

  const processedData = dataProcess(userData.ticketsAll, userData);

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

  return (
      <div>
        <Pie options={options} data={processedData} style={styles}/>
        <div class="d-grid gap-2 col-2 mx-auto">
          <Button variant="primary" onClick={onShow} className="btn btn-sm">
              Enlarge
          </Button>
        </div>
        <EnlargeModal show={modalShow} onHide={onHide}>
          <Pie data={processedData} style={{maxHeight: "25rem"}} />
        </EnlargeModal>
      </div>
  );
}