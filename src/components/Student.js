import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';

export default function Student() {
  const boxstyle = { margin: '' }
  const h1style = { color: 'blue', fontSize: '23px', margin: '2%' };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('')
  const [students, setStudents] = useState([]);
  const [studentList, setstudentList] = useState([]);
  const [studentId, setStudentId] = useState(null)

  const handleClick = (e) => {
    e.preventDefault()
    const student = { name, address }
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    }).then(() => {
      console.log("new student added")
    })
  }

  const studentGetAll = () => {
    fetch("http://localhost:8080/student/getAll")
      .then(res => res.json())
      .then((result) => {
        setStudents(result);
        setstudentList(result)
      })
  }

  useEffect(() => {
    studentGetAll();
  }, [studentList])


  const deleteStudent = async (id) => {
    await fetch(`http://localhost:8080/student/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedStudents = [...students].filter(i => i.id !== id);
      setStudents(updatedStudents);
    });
  }

  return (
    <Container>
      <h1 style={h1style}>ADD STUDENT</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2, width: 350 },
        }}
        noValidate
        autoComplete="off"
        style={boxstyle}
      >

        <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
          value={name} onChange={(e) => setName(e.target.value)} />

        <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
          value={address} onChange={(e) => setAddress(e.target.value)} />

      </Box>
      <br></br>
      <Button variant="contained" onClick={handleClick}>Sumbit</Button>

      <br></br>

      <h1 style={{ color: 'blue', fontSize: '25px', textAlign: 'left' }}>Students</h1>

      <div style={{ textAlign: 'center', }} >


        <table border="3" style={{ float: 'left' }}>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Address</td>
              <td>Operations</td>
            </tr>
            {
              students.map((e, i) =>
                <tr key={i}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.address}</td>
                  <td><Button style={{ margin: '1%' }} variant="outlined" color="error" onClick={() => deleteStudent(e.id)}>
                    Delete
                  </Button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div>
        </div>
      </div>
    </Container>
  );
}
