import React, {useState} from 'react';
import './AddStudent.css'
import axios from "axios";

const AddStudent = ({active, setActive, dbChanged, setDbChanged}) => {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [group, setGroup] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/students', {
      name,
      surname,
      group
    }).finally(() => {
      setName('')
      setSurname('')
      setGroup('')
      setActive(false)
      setDbChanged(!dbChanged)
      console.log(`User ${name} ${surname} from ${group} was successfully added`)
    })

  }

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <p>Name of student</p>
          <input type="text" placeholder='Enter a name' value={name} onChange={(e) => setName(e.target.value)}/>
          <p>Surname of student</p>
          <input type="text" placeholder='Enter a name' value={surname} onChange={(e) => setSurname(e.target.value)}/>
          <p>Group of student</p>
          <input type="text" placeholder='Enter a name' value={group} onChange={(e) => setGroup(e.target.value)}/>
          <br/>
          <button style={{marginTop: 10, backgroundColor: "greenyellow"}}>ADD</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
