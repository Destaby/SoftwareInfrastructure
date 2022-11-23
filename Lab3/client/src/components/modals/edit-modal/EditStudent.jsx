import React, {useEffect, useState} from 'react';
import './EditModal.css'
import axios from "axios";

const EditStudent = ({name, surname, group, active, setActive, dbChanged, setDbChanged}) => {

  const [nameToEdit, setName] = useState('')
  const [surnameToEdit, setSurname] = useState('')
  const [groupToEdit, setGroup] = useState('')

  useEffect(() => {
    setName(name)
    setSurname(surname)
    setGroup(group)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // NO SUCH FUNCTIONAL ON SERVER
    // axios.patch('http://localhost:8080/students', {data: {nameToEdit, surnameToEdit, groupToEdit}}).finally(() => {
    //   setDbChanged(!dbChanged)
    // })
    console.log(`User ${name} ${surname} from ${group} was successfully updated to -- ${nameToEdit} ${surnameToEdit} from ${groupToEdit}`)
  }

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h3>Please fill the info you want to edit</h3>
          <p>Name of student</p>
          <input type="text" placeholder='Enter a name' value={nameToEdit} onChange={(e) => setName(e.target.value)}/>
          <p>Surname of student</p>
          <input type="text" placeholder='Enter a name' value={surnameToEdit} onChange={(e) => setSurname(e.target.value)}/>
          <p>Group of student</p>
          <input type="text" placeholder='Enter a name' value={groupToEdit} onChange={(e) => setGroup(e.target.value)}/>
          <br/>
          <button style={{marginTop: 10, backgroundColor: "greenyellow"}}>EDIT</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
