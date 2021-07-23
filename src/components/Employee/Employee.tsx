import React from 'react';
import styled from 'styled-components';
import { patchEmployees } from '../../api/api';
import { Statuses, STATUSES } from '../Statuses';

const Item = styled.li`
  display: flex;
  align-items: center;
`

const Name = styled.h3`
  width: 150px;
`

export type EmployeePayload = {
  name: string;
  status: STATUSES;
};

export type FullEmployee = EmployeePayload & {
  id: string;
}

type EmployeeProps = FullEmployee & {
  refreshEmployees: () => Promise<void>;
}

export const Employee = ({id, name, status, refreshEmployees}: EmployeeProps) => {
  const [edit, setEdit] = React.useState(false);
  const [editName, setEditName] = React.useState(name);
  const [editStatus, setEditStatus] = React.useState(status);

  return (
    <Item onClick={() => {
      setEdit(prevState => !prevState);
      setEditName(name);
      setEditStatus(status);
    }}>
      {edit ? (
        <>
          <input onClick={(e: any) => e.stopPropagation()} value={editName} onChange={(e: any) => setEditName(e.target.value)} />
          <select onClick={(e: any) => e.stopPropagation()} value={editStatus} onChange={(e: any) => setEditStatus(e.target.value)}>
            {Object.values(STATUSES).map((status, i) => <option key={i} value={status}>{status}</option>)}
          </select>
          <button onClick={async (e: any) => {
            e.stopPropagation();
            await patchEmployees(id, {name: editName, status: editStatus});
            await refreshEmployees();
            setEdit(prevState => !prevState);
          }}>Edit</button>
          <button onClick={(e: any) => {
            e.stopPropagation();
            setEdit(prevState => !prevState)
          }}>Cancel</button>
        </>
      ) : (
        <>
          <Name>{name}</Name>
          <Statuses status={status} />
        </>
      )}
    </Item>
  )
}
