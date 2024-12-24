import { useState, useEffect } from 'react';
import { getAllRoutines } from '../../services/api';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const data = await getAllRoutines();
      setRoutines(data);
    };
    fetchRoutines();
  }, []);

  return (
    <div className="space-y-4">
      {routines.map((routine) => (
        <Card key={routine._id} className="p-4 bg-white shadow-md">
          <h3 className="text-xl font-semibold">{routine.name}</h3>
          <p className="text-gray-500">Duration: {routine.duration} weeks</p>
          <Link to={`/routine/${routine._id}`} className="text-blue-500">View Details</Link>
        </Card>
      ))}
    </div>
  );
};

export default RoutineList;
