import React, { useState } from 'react';
import {Container, TextField, Typography, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//     root: {
//         margin: 1,
//         },
//     button: {
//         margin: 1,
//     }
// })

export default function gpa_calculation () {
    // const classes = useStyles()
    const [grade,setGrade] = useState(0.0);
    const [inputFields, setInputFields] = useState([
      { id: uuidv4(), subject: '', grade: 0,weight:0 },
    ]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("InputFields", inputFields);
      var res = await axios.post("http://localhost:8000/getgpa",inputFields);
      console.log(res.data.grade);
      setGrade(res.data.grade);
    };
  
    const handleChangeInput = (id, event) => {
      const newInputFields = inputFields.map(i => {
        if(id === i.id) {
          i[event.target.name] = event.target.value
        }
        return i;
      })
      
      setInputFields(newInputFields);
    }
  
    const handleAddFields = () => {
      setInputFields([...inputFields, { id: uuidv4(),  subject: '', grade: 0,weight:0 }])
    }
  
    const handleRemoveFields = id => {
      const values  = [...inputFields];
      values.splice(values.findIndex(value => value.id === id), 1);
      setInputFields(values);
    }

    return(
        <Container>
        <h1>Add New Member</h1>
        <form style={{margin:1}} onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
            <div key={inputField.id}>
            <TextField
                name="subject"
                label="Subject"
                variant="filled"
                value={inputField.subject}
                onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
                name="grade"
                label="Score"
                variant="filled"
                value={inputField.grade}
                onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
                name="weight"
                label="Weight"
                variant="filled"
                value={inputField.weight}
                onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                <DeleteIcon />
            </IconButton>
            <IconButton
                onClick={handleAddFields}
            >
                <AddIcon />
            </IconButton>
            </div>
        )) }
        <Button
            style={{marginTop: "10px", marginBottom: "5px"}}
            // className={classes.button}
            variant="contained" 
            color="primary" 
            type="submit" 
            endIcon={<SendIcon />}
            onClick={handleSubmit}
        >Send</Button>
        </form>
        <Typography variant="h6" color="inherit" component="div">
        Your GPA is: {grade}
        </Typography>
      </Container>
    )
}