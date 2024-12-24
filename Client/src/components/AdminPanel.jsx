import { useState } from 'react';
import { createRoutine, updateRoutine, deleteRoutine } from '../../services/api';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';


const AdminPage = () => {
  const [routineName, setRoutineName] = useState('');
  const [duration, setDuration] = useState('');
  const [routineIdToUpdate, setRoutineIdToUpdate] = useState('');
  const [newRoutineName, setNewRoutineName] = useState('');

  const handleCreateRoutine = async () => {
    const newRoutine = { name: routineName, duration };
    await createRoutine(newRoutine);
  };

  const handleUpdateRoutine = async () => {
    const updatedRoutine = { name: newRoutineName };
    await updateRoutine(routineIdToUpdate, updatedRoutine);
  };

  const handleDeleteRoutine = async (routineId) => {
    await deleteRoutine(routineId);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Manage Routines</h1>
      <div className="space-y-4">
        <Input 
          placeholder="Routine Name" 
          value={routineName} 
          onChange={(e) => setRoutineName(e.target.value)} 
        />
        <Input 
          placeholder="Duration (weeks)" 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)} 
        />
        <Button onClick={handleCreateRoutine}>Create Routine</Button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Update Routine</h2>
        <Input
          placeholder="Routine ID to update"
          value={routineIdToUpdate}
          onChange={(e) => setRoutineIdToUpdate(e.target.value)}
        />
        <Input
          placeholder="New Routine Name"
          value={newRoutineName}
          onChange={(e) => setNewRoutineName(e.target.value)}
        />
        <Button onClick={handleUpdateRoutine}>Update Routine</Button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Delete Routine</h2>
        <Input
          placeholder="Routine ID to delete"
          onChange={(e) => handleDeleteRoutine(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdminPage;
