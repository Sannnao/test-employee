import React from 'react';
import styled from 'styled-components';
import { STATUSES } from '../Statuses';
import { getEmployees, postEmployees } from '../../api/api';
import {Employee, EmployeeProps} from '../Employee';

const List = styled.ul`
  list-style: none;
`

export const EmployeesList = () => {
  const [employees, setEmployees] = React.useState<null | EmployeeProps[]>(null);
  const [newEmployee, setNewEmployee] = React.useState('');

  const refreshEmployees = React.useCallback(async () => {
    const receivedEmployees = await getEmployees();
    setEmployees(receivedEmployees);
  }, []);

  React.useEffect(
    function fetchEmployees() {
      refreshEmployees();
    }, [refreshEmployees]
  );

  return (
    <div>
      <input value={newEmployee} onInput={(e: any) => setNewEmployee(e.target.value)}/>
      <button onClick={async () => {
        await postEmployees({name: newEmployee, status: STATUSES.added});
        await refreshEmployees();
        setNewEmployee('');
      }}>
        Add employee
      </button>
      <List>
        {employees ? employees.map(({id, name, status}) => (
          <Employee key={id} id={id} name={name} status={status} refreshEmployees={refreshEmployees} />
        )) : null}
      </List>
    </div>

  )
}
