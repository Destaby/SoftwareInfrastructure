import React, {useEffect, useLayoutEffect, useState} from 'react';
import "./StudentList.css"
import StudentItem from "../student-item/StudentItem";
import axios from "axios";
import AddStudent from "../modals/add-modal/AddStudent";

const StudentList = () => {


  const [studentsList, setStudents] = useState([])
  const [dbChanged, setDbChanged] = useState(false)
  const [addStudentActive, setAddStudentActive] = useState(false)


  useEffect(() => {
    axios.get("http://localhost:8080/students").then((res) => {
      setStudents(res.data)
    }
    )
  }, [dbChanged])


  return (
    <div className="student-list">
      {(studentsList.length !== 0) ? studentsList.map((el) => {
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
      <button style={{
        position: "relative",
        left: 10,
        marginTop: 50,
        marginBottom: 10,
        backgroundColor: "greenyellow"
      }}
        onClick={() => setAddStudentActive(true)}
      >ADD STUDENT</button>

      <AddStudent active={addStudentActive} setActive={setAddStudentActive} dbChanged={dbChanged} setDbChanged={setDbChanged}/>

    </div>
  );
};

export default StudentList;
