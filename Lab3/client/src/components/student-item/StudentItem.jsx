import React, {useState} from 'react';
import './StudentItem.css'
import axios from "axios";
import EditStudent from "../modals/edit-modal/EditStudent";

const StudentItem = ({name, group, surname,dbChanged, setDbChanged}) => {

  const [active, setActive] = useState(false)


  let deleteStudent = () => {
    console.log(`User "${name} ${surname} from ${group}" was successfully deleted`)
    axios.delete('http://localhost:8080/students', {data: {name, surname, group}}).finally(() => {
      setDbChanged(!dbChanged)
    })
  }

  return (
    <div className="student-item">
      <div className='student-info'>
          <p style={{width: 200}}>{name} {surname}</p>
          <p style={{marginLeft: 200}}>{group}</p>
      </div>
      <div className='buttons'>
        <button style={{backgroundColor: "yellow"}} onClick={() => setActive(true)}>Edit</button>
        <button style={{backgroundColor: "red"}} onClick={deleteStudent}>Delete</button>
      </div>
      <EditStudent active={active}
                   setActive={setActive}
                   name={name}
                   surname={surname}
                   group={group}
                   dbChanged={dbChanged}
                   setDbChanged={setDbChanged}
      />
    </div>
  );
};

export default StudentItem;
