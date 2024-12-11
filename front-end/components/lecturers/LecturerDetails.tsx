import React from 'react';
import { Lecturer } from '@types';

type Props = {
  lecturer: Lecturer;
};

const LecturerDetails: React.FC<Props> = ({ lecturer }: Props) => {
  return (
    <>
      {lecturer && (
        <table>
          <tr>
            <td>ID:</td>
            <td>{lecturer.id}</td>
          </tr>
          <tr>
            <td>Firstname:</td>
            <td>{lecturer.user.firstName}</td>
          </tr>
          <tr>
            <td>Lastname:</td>
            <td>{lecturer.user.lastName}</td>
          </tr>
          <tr>
            <td>E-mail:</td>
            <td>{lecturer.user.email}</td>
          </tr>
          <tr>
            <td>Expertise:</td>
            <td>{lecturer.expertise}</td>
          </tr>
        </table>
      )}
    </>
  );
};

export default LecturerDetails;
