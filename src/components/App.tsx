import { useState, useEffect,useCallback } from "react";
import Table from "./DisplayTable/table";
import axios from "axios";
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddDetails from "./AddingNewDetails/AddDetails";

interface TableHeaders {
  id: string;
  name: string;
  gender: string;
  physics: number;
  maths: number;
  english: number;
}
const App = () => {
  const [details, setDetails] = useState<TableHeaders[]>([]);
  const [showAddDetails, setShowAddDetails] = useState<boolean>(false);
  const [searchTerm,setSearchTerm]=useState<string>('')

  const data = async () => {
    const response = await axios.get<TableHeaders[]>('http://localhost:3002/students');
    setDetails(response.data);
  };

  useEffect(() => {
    data();
  }, []);

  const handleDelete=useCallback(
    async (id:string)=>{
      await axios.delete( `http://localhost:3002/students/${id}`)
      data();
    },[])

  const config = [
    { label: "Name", render: (data:TableHeaders) => data.name },
    { label: "Gender", render: (data:TableHeaders) => data.gender },
    { label: "Physics", render: (data:TableHeaders) => data.physics },
    { label: "Maths", render: (data:TableHeaders) => data.maths },
    { label: "English", render: (data:TableHeaders) => data.english },
    {label:"delete",render:(data:TableHeaders)=><button onClick={()=>handleDelete(data.id)}>Delete</button>}
  ];

  const handleAddButtonClick = useCallback(() => {
    setShowAddDetails(true);
  },[]);

  const handleClose =useCallback(() => {
    setShowAddDetails(false);
  },[]);

  const handleSearchChange=useCallback(
    (event: React.ChangeEvent<HTMLInputElement>)=>{
      setSearchTerm(event.target.value)
    },[]);

  const filteredDetails=details.filter(student=>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div > 
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="d-flex justify-content-end mb-4">
            Search:
            <input className="" type="text" onChange={handleSearchChange}  value={searchTerm} placeholder="Search"/>
            </div>
            <Table details={filteredDetails} config={config} />
            <div className="d-flex justify-content-end mt-3">
              <button className="custom-button" onClick={handleAddButtonClick}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>
      {showAddDetails && <AddDetails fetchagain={data} onClose={handleClose} />}


    </div>
  );
};

export default App;
