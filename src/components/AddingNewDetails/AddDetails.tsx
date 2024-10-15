import { useState,useCallback } from "react";
import axios from "axios";
import { Form, Button, Container } from 'react-bootstrap';
import './AddDetails.css';


interface AddDetailsProps {
    fetchagain: () => void;
    onClose: () => void;
  }

const AddDetails = ({ fetchagain, onClose }:AddDetailsProps) => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [physics, setPhysics] = useState<string>("");
  const [maths, setMaths] = useState<string>("");
  const [english, setEnglish] = useState<string>("");

  const handleSubmit = useCallback(
    async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await axios.post('http://localhost:3002/students', {
          name,
          gender,
          physics: Number(physics),
          maths: Number(maths),
          english: Number(english),
        });
    
        fetchagain();
        resetForm();
        onClose();
      },[fetchagain,gender, maths, name, physics, english, onClose])

  const resetForm = useCallback(() => {
    setName('');
    setGender('');
    setPhysics('');
    setMaths('');
    setEnglish('');
  },[]);

  return (
    <div className="overlay" >
        <div className="body">
        <Container className="d-flex justify-content-center align-items-center" style={{ zIndex: 2 }}>
        <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group controlId="formName" className="form-row">
  <Form.Label>Name</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    className="fixed-input"
  />
</Form.Group>

<Form.Group controlId="formGender" className="form-row">
  <Form.Label>Gender</Form.Label>
  <Form.Check 
    type="radio" 
    label="Male" 
    name="gender" 
    value="Male" 
    checked={gender === "Male"}
    onChange={(e) => setGender(e.target.value)}
    required 
  />
  <Form.Check 
    type="radio" 
    label="Female" 
    name="gender" 
    value="Female" 
    checked={gender === "Female"}
    onChange={(e) => setGender(e.target.value)}
    required 
  />
</Form.Group>

<Form.Group controlId="formPhysics" className="form-row">
  <Form.Label>Physics Marks</Form.Label>
  <Form.Control
    type="number"
    placeholder="Enter Physics marks"
    value={physics}
    onChange={(e) => setPhysics(e.target.value)}
    required
    className="fixed-input"
  />
</Form.Group>

<Form.Group controlId="formMaths" className="form-row">
  <Form.Label>Maths Marks</Form.Label>
  <Form.Control
    type="number"
    placeholder="Enter Maths marks"
    value={maths}
    onChange={(e) => setMaths(e.target.value)}
    required
    className="fixed-input"
  />
</Form.Group>

<Form.Group controlId="formEnglish" className="form-row">
  <Form.Label>English Marks</Form.Label>
  <Form.Control
    type="number"
    placeholder="Enter English marks"
    value={english}
    onChange={(e) => setEnglish(e.target.value)}
    required
    className="fixed-input"
  />
</Form.Group>

<Button variant="primary" type="submit">
    Submit
  </Button>
        </Form>
      </Container>
        </div>
      
    </div>
  );
  
};

export default AddDetails;
