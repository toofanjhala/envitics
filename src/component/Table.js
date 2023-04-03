import React, { useState, useEffect } from 'react';
import { Table, Container, Row } from 'react-bootstrap';
import { BsFillPencilFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import "./Table.css"


export const DataTable = (props) => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://dummy.restapiexample.com/api/v1/employees");
                const res = await response.json();

                setEmployees(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const renderEmployees = currentEmployees.filter((employee) => {
        if (searchTerm === "") {
            return employee;
        } else if (employee.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return employee;
        }
        return false;
    }).map((employee, index) => (
        <tr key={index}>
            <td>{employee.id}</td>
            <td><BsFillPersonFill /></td>
            <td>{employee.employee_name}</td>
            <td>{employee.employee_salary}</td>
            <td>{employee.employee_age}</td>
            <td><BsFillPencilFill /><AiFillDelete /></td>
        </tr>
    ));

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const renderPageNumbers = pageNumbers.map((number) => (
        <li key={number} id={number} onClick={handleClick} className={currentPage === number ? 'active' : null}>
            {number}
        </li>
    ));

    return (
        <div className="Container" style={{ width: '50%', margin: "50px auto" }} >
            <div className="search-bar Row">
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
            </div>
            <div className='Row table-container'>

                <Table className="Row expense-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>profile</th>
                            <th>Employee Name</th>
                            <th>Salary</th>
                            <th>age</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderEmployees}
                    </tbody>
                </Table>
            </div>
            <div className="pagination Row" >
                <ul>
                    {renderPageNumbers}
                </ul>
            </div>
        </div>
    );
};
