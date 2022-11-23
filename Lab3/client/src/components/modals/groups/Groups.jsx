import React, {useState} from 'react';
import axios from "axios";

const Groups = ({active, setActive, groups, dbChanged, setDbChanged}) => {

  const [newGroup, setNewGroup] = useState('')

  const clickHandler = async (group) => {
    await axios.delete('http://localhost:8080/groups', {data: {name: "IP-99"}})
    setDbChanged(!dbChanged)
    console.log(`Group ${group.name} was successfully deleted`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newGroupObj = {name: newGroup}
    console.log(newGroupObj)
    await axios.post('http://localhost:8080/groups', newGroupObj)
    setNewGroup('')
    setDbChanged(!dbChanged)
  }


  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)} >
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        {groups.map(group =>
        <div key={group.id} style={{width: "100%",display: "flex", justifyContent: "space-between", border: "1px black solid"}}>
          <p style={{marginLeft: 10}}>{group.name}</p>
          <button style={{backgroundColor: "red"}} onClick={() => clickHandler(group)}>DELETE</button>
        </div>
        )}
        <form onSubmit={handleSubmit}>
          <h3>Add group</h3>
          <input type="text" value={newGroup} onChange={(e) => setNewGroup(e.target.value)}/>
          <button style={{backgroundColor: "greenyellow", marginTop: 10}}>ADD</button>
      </form>


      </div>
    </div>
  );
};

export default Groups;
