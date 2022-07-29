import React, { useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import EnlargeModal from './EnlargeModal';
import demoProjects from '../../services/demoProjects';
import { useUserData } from '../../contexts/UserDataContext';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

function dataProcess(projects, userData){
  let data;

  let liveData = {
    labels: ["Open Projects", "Projects In Progress...", "Complete Projects"],
    datasets: [
      {
        label: "In Progress",
        data: [0, 0, 0],
        backgroundColor: ["rgba(0,128,0,0.5)", "rgba(204,204,0,0.5)", "rgba(255, 0, 0, 0.5)"]
      }
    ],
    borderWidth: 1
  }

  let demoData = {
    labels: ["Open Projects", "Projects In Progress...", "Complete Projects"],
    datasets: [
      {
        label: "In Progress",
        data: [4, 1, 7],
        backgroundColor: ["rgba(0,128,0,0.5)", "rgba(204,204,0,0.5)", "rgba(255, 0, 0, 0.5)"]
      }
    ],
    borderWidth: 1
  }

  if(userData.mode === "live"){
    data = liveData;
  }else{
    data = demoData;
  }

  projects.forEach(project => {
    if(project.status === "Open"){
      data.datasets[0].data[0]++;
    }else if(project.status === "In Progress..."){
      data.datasets[0].data[1]++;
    }else if(project.status === "Closed"){
      data.datasets[0].data[2]++;
    }
  });
  return data;
}

export default function PolarAreaChart(props) {

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
       <PolarArea data={processedData} style={styles}/>
       <div class="d-grid gap-2 col-2 mx-auto">
          <Button variant="primary" onClick={onShow} className="btn btn-sm">
              Enlarge
          </Button>
      </div>
      <EnlargeModal show={modalShow} onHide={onHide}>
        <PolarArea data={processedData} style={{maxHeight: "25rem"}} />
      </EnlargeModal>
    </div>
  );
}
