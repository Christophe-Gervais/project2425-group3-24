import React, { useState } from 'react';
import { Course, Lecturer } from '@types';

type Props = {
  lecturer: Lecturer;
};

const CourseOverviewTable: React.FC<Props> = ({ lecturer }: Props) => {
  return (
    <>
      {lecturer && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
            </tr>
          </thead>
          <tbody>
            {lecturer.courses.map((course, index) => (
              <tr key={index} onClick={() => {}} role="button">
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.phase}</td>
                <td>{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CourseOverviewTable;
