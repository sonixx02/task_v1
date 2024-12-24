import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRoutineById } from '../../services/api';

const RoutineDetail = () => {
  const { routineId } = useParams();
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      const data = await getRoutineById(routineId);
      setRoutine(data);
    };
    fetchRoutine();
  }, [routineId]);

  if (!routine) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white shadow-lg">
      <h2 className="text-2xl font-semibold">{routine.name}</h2>
      <p className="text-gray-500">Duration: {routine.duration} weeks</p>
      <div className="mt-4 space-y-4">
        {routine.steps.map((step, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold">Step {idx + 1}: {step}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineDetail;
