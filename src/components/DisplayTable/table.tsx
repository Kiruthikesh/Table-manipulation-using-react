import { useCallback } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

interface TableHeaders {
  id: string; 
  name: string;
  gender: string;
  physics: number;
  maths: number;
  english: number;
}

interface Config {
  label: string;
  render: (data: TableHeaders) => React.ReactNode;
}

interface TableProps {
  details: TableHeaders[];
  config: Config[];
}

const Table = ({ details, config }: TableProps) => {
  const headers = config.map((data, index) => (
    <th key={index}>{data.label}</th>
  ));

  const renderRow = useCallback((student: TableHeaders) => {
    const renderedCells = config.map((data, i) => (
      <td key={i}>{data.render(student)}</td>
    ));
    return <tr key={student.id}>{renderedCells}</tr>; 
  }, [config]);

  const rows = details.map(renderRow);

  return (
    <BootstrapTable striped bordered hover>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </BootstrapTable>
  );
};

export default Table;
