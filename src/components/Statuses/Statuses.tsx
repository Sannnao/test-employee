import styled from 'styled-components';

export enum STATUSES {
  added = 'Added',
  inCheck = 'In-check',
  approved = 'Approved',
  active = 'Active',
  inactive = 'Inactive',
}

const Status = styled.div<{isActive: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  margin: 0 2px;
  color: #f1f1f1;
  background-color: ${props => props.isActive ? 'lightcoral' : 'lightblue'};
  box-shadow: 0 0 5px 0 grey;
  border-radius: 5px;
`

const StatusList = styled.div`
  display: flex;
`

export type StatusesProps = {
  status: STATUSES
}

export const Statuses = ({status}: StatusesProps) => {
  return (
    <StatusList>
      {Object.values(STATUSES).map((constStatus, id) => {
        const isActive = constStatus === status;

        return (
            <Status
              key={id}
              isActive={isActive}
            >
              {constStatus}
            </Status>
        )
      })}
    </StatusList>
  )
}
