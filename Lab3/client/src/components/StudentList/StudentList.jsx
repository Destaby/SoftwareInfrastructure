import React, {useEffect, useLayoutEffect, useState} from 'react';
import "./StudentList.css"
import StudentItem from "../student-item/StudentItem";
import axios from "axios";
import AddStudent from "../modals/add-modal/AddStudent";
import Groups from "../modals/groups/Groups";

const StudentList = () => {


  const [studentsList, setStudents] = useState([])
  const [dbChanged, setDbChanged] = useState(false)
  const [dbGroupsChanged, setGroupsChanged] = useState(false)
  const [addStudentActive, setAddStudentActive] = useState(false)
  const [groupList, setGroupList] = useState([])
  const [groupActive, setGroupActive] = useState(false)
  const [currentGroup, setCurrentGroup] = useState('')
  const [groupModalActive, setGroupModalActive] = useState(false)


  useEffect(() => {
    axios.get('/groups').then((res) => {
      const groups = res.data.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });
      setGroupList(groups)
      setCurrentGroup(groups[0].name)
      setGroupActive(true)
    })
  }, [dbGroupsChanged])

  useEffect(() => {
    axios.get("/students").then((res) => {
      setStudents(res.data)
    }
    )

  }, [dbChanged, groupList])

  const handleSelect = (e) => {
    setCurrentGroup(e.target.value)
    setGroupActive(true)
  }

  const studentsByGroup = studentsList.filter(el => el.group === currentGroup)

  const buttons = <><button style={{
    position: "relative",
    left: 10,
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: "greenyellow"
  }}
          onClick={() => setAddStudentActive(true)}
  >ADD STUDENT</button>
  <button
    style={{
      position: "relative",
      marginLeft: 20,
      marginTop: 50,
      marginBottom: 10,
      backgroundColor: "cornflowerblue"
    }}
    onClick={() => setGroupModalActive(true)}
  >MANAGE GROUPS</button></>

  return (

    <div className="student-list">
      {groupActive !== true
        ?
        <><div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
          <h2>Please, select group</h2>
          <br/>
        <select style={{width: 100, height: 60, fontSize: 20}}
          value={currentGroup} onChange={(e) => handleSelect(e)}>
          {groupList.map(elem => <option key={elem.id} value={elem.name}>{elem.name}</option>)}
        </select>
        </div>
        <div>{buttons}</div></>
      : <div>
          <select value={currentGroup} onChange={(e) => handleSelect(e)}>
            {groupList.map(elem => <option key={elem.id} value={elem.name}>{elem.name}</option>)}
          </select>
          <h2>Student from {currentGroup}</h2>
          {(studentsByGroup.length !== 0) ? studentsByGroup.map((el) => {
            return (
              <StudentItem key={el._id}
                           name={el.name}
                           surname={el.surname}
                           group={el.group}
                           dbChanged={dbChanged}
                           setDbChanged={setDbChanged}

              />

            )
          }) : <div>Sorry, can't found students</div>
          }
          {buttons}
        </div>
      }

      <AddStudent active={addStudentActive} setActive={setAddStudentActive} dbChanged={dbChanged} setDbChanged={setDbChanged}/>
      <Groups active={groupModalActive} setActive={setGroupModalActive} groups={groupList} dbChanged={dbGroupsChanged} setDbChanged={setGroupsChanged}/>
    </div>
  );
};

export default StudentList;
