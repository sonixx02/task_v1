import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Clock, 
  Calendar, 
  Trophy, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  Info,
  LineChart,
  ListTodo
} from 'lucide-react';


const MOCK_ROUTINES = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start your day with mindfulness and clarity',
    difficulty: 'Beginner',
    duration: '8 weeks',
    benefits: ['Reduced stress', 'Better focus', 'Improved sleep'],
    weeklyTasks: [
      ['5 minutes daily meditation', 'Morning journal entry'],
      ['10 minutes daily meditation', 'Mindful breathing exercises'],
      ['15 minutes daily meditation', 'Body scan practice'],
      ['20 minutes daily meditation', 'Guided visualization'],
      ['25 minutes daily meditation', 'Loving-kindness practice'],
      ['30 minutes daily meditation', 'Silent meditation'],
      ['35 minutes daily meditation', 'Walking meditation'],
      ['40 minutes daily meditation', 'Integration of practices']
    ]
  },
  {
    id: '2',
    title: 'Strength Training',
    description: 'Build strength and muscle with progressive workouts',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    benefits: ['Increased strength', 'Better posture', 'Muscle growth', 'Improved metabolism'],
    weeklyTasks: [
      ['3 full-body workouts', 'Track progress in app'],
      ['4 workouts with increased weight', 'Recovery exercises'],
      ['Complex movement patterns', 'Nutrition tracking'],
      ['Increase sets and reps', 'Form refinement'],
      ['Progressive overload', 'Recovery optimization'],
      ['Advanced techniques', 'Measurement tracking'],
      ['Peak intensity week', 'Progress assessment'],
      ['Deload and planning', 'Future program setup']
    ]
  }
];

const UserDashboard = () => {
  const [user, setUser] = useState({ name: 'User' });
  const [availableRoutines, setAvailableRoutines] = useState([]);
  const [activeRoutines, setActiveRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleViewDetails = (routine) => {
    setSelectedRoutine(routine);
    setShowDetails(true);
  };

  const handleStartRoutine = async (routineId) => {
    if (!routineId) return;
    try {
      
      const routine = availableRoutines.find(r => r.id === routineId);
      if (routine) {
        const activeRoutine = {
          ...routine,
          isActive: true,
          progress: 0,
          currentWeek: 1
        };
        setActiveRoutines([...activeRoutines, activeRoutine]);
      }
      setShowDetails(false);
    } catch (error) {
      console.error('Error starting routine:', error);
      setError('Failed to start routine. Please try again.');
    }
  };

  const handleUpdateProgress = async (routineId, progressData) => {
    if (!routineId) return;
    try {
      
      const updatedRoutines = activeRoutines.map(routine => {
        if (routine.id === routineId) {
          return {
            ...routine,
            ...progressData
          };
        }
        return routine;
      });
      setActiveRoutines(updatedRoutines);
    } catch (error) {
      console.error('Error updating progress:', error);
      setError('Failed to update progress. Please try again.');
    }
  };

  const fetchRoutines = async () => {
    setLoading(true);
    setError(null);
    try {

      const routinesData = MOCK_ROUTINES;
      setAvailableRoutines(routinesData);

      
      const activeRoutinesData = [
        {
          ...routinesData[0],
          isActive: true,
          progress: 62.5,
          currentWeek: 5
        }
      ];

      setActiveRoutines(activeRoutinesData);
    } catch (error) {
      console.error('Error fetching routines:', error);
      setError('Failed to load routines. Please try again.');
      setAvailableRoutines([]);
      setActiveRoutines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const DashboardOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-900">Active Routines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{activeRoutines.length}</div>
          <p className="text-sm text-gray-600 mt-1">Current active routines</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-900">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(activeRoutines.reduce((acc, curr) => acc + (curr.progress || 0), 0) / 
              (activeRoutines.length || 1))}%
          </div>
          <p className="text-sm text-gray-600 mt-1">Average across all routines</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-900">Benefits Achieved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {activeRoutines.reduce((acc, curr) => acc + (Array.isArray(curr.benefits) ? curr.benefits.length : 0), 0)}
          </div>
          <p className="text-sm text-gray-600 mt-1">Total benefits unlocked</p>
        </CardContent>
      </Card>
    </div>
  );

  const ActiveRoutinesSection = () => (
    <div className="space-y-6">
      {activeRoutines.map((routine, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-gray-900">{routine.title || 'Untitled Routine'}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  Week {routine.currentWeek || 1}/8
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-gray-900">{routine.progress || 0}% Complete</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={routine.progress || 0} className="h-2" />
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-900">Benefits Achieved:</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(routine.benefits) && routine.benefits.map((benefit, idx) => (
                  <Badge key={idx} variant="outline" className="flex items-center gap-1 text-gray-900">
                    <CheckCircle className="w-3 h-3" />
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleViewDetails(routine)}>
              View Details & Update Progress
              <Info className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const AvailableRoutinesSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableRoutines
        .filter(routine => !activeRoutines.find(ar => ar.id === routine.id))
        .map((routine, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-gray-900">{routine.title}</CardTitle>
              <Badge variant="secondary" className="text-gray-900">{routine.difficulty}</Badge>
            </div>
            <CardDescription className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              {routine.duration}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 line-clamp-2">{routine.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {routine.benefits.slice(0, 2).map((benefit, idx) => (
                <Badge key={idx} variant="outline" className="flex items-center gap-1 text-gray-900">
                  <CheckCircle className="w-3 h-3" />
                  {benefit}
                </Badge>
              ))}
              {routine.benefits.length > 2 && (
                <Badge variant="outline" className="text-gray-900">+{routine.benefits.length - 2} more</Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 mt-auto">
            <Button variant="outline" className="flex-1" onClick={() => handleViewDetails(routine)}>
              Details
              <Info className="w-4 h-4 ml-2" />
            </Button>
            <Button className="flex-1" onClick={() => handleStartRoutine(routine.id)}>
              Start
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const RoutineDetails = ({ routine }) => (
    <ScrollArea className="h-[70vh]">
      <div className="space-y-6 p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-gray-900">{routine.difficulty}</Badge>
            <Badge variant="outline" className="text-gray-900">
              <Clock className="w-3 h-3 mr-1" />
              {routine.duration}
            </Badge>
          </div>
          <p className="text-gray-600">{routine.description}</p>
        </div>

        {routine.isActive && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-900">Current Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-900">Overall Progress</span>
                  <span className="text-gray-900">{routine.progress}%</span>
                </div>
                <Progress value={routine.progress} className="h-2" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-900">Week {routine.currentWeek} of 8</h4>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleUpdateProgress(routine.id, {
                    currentWeek: routine.currentWeek + 1,
                    progress: Math.min(100, routine.progress + 12.5)
                  })}
                >
                  Mark Week {routine.currentWeek} Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <Trophy className="w-5 h-5 text-primary" />
            Benefits
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {routine.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-900">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <Calendar className="w-5 h-5 text-primary" />
            Weekly Breakdown
          </h3>
          <div className="space-y-4">
            {routine.weeklyTasks.map((week, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base text-gray-900">Week {idx + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {week.map((task, taskIdx) => (
                      <li key={taskIdx} className="text-sm text-gray-600">
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {error && (
        <Card className="bg-red-50">
          <CardContent className="p-4 text-red-600">{error}</CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Track your progress and manage your routines</p>
          </div>
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
      </div>

      <DashboardOverview />

      {loading ? (
        <Card>
          <CardContent className="p-6 flex items-center justify-center">
            <p className="text-gray-600">Loading routines...</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <LineChart className="w-4 h-4" />
              Active Routines ({activeRoutines.length})
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <ListTodo className="w-4 h-4" />
              Available Routines ({availableRoutines.filter(routine => 
                !activeRoutines.find(ar => ar.id === routine.id)).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeRoutines.length > 0 ? (
              <ActiveRoutinesSection />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">No Active Routines</CardTitle>
                  <CardDescription className="text-gray-600">
                    Start a new routine to begin your journey
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.querySelector('[value="available"]').click()}
                  >
                    Browse Available Routines
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="available">
            {availableRoutines.length > 0 ? (
              <AvailableRoutinesSection />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">No Available Routines</CardTitle>
                  <CardDescription className="text-gray-600">
                    Check back later for new routines
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{selectedRoutine?.title}</DialogTitle>
            <DialogDescription className="text-gray-600">
              Complete routine details and progress tracking
            </DialogDescription>
          </DialogHeader>
          {selectedRoutine && <RoutineDetails routine={selectedRoutine} />}
          <DialogFooter>
            {!activeRoutines.find(r => r.id === selectedRoutine?.id) && (
              <Button onClick={() => handleStartRoutine(selectedRoutine?.id)}>
                Start This Routine
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;