import React, { useState, useEffect } from 'react';
import {
  Grid,
  View,
  Heading,
  Divider,
  ProgressCircle,
  Content,
  IllustratedMessage,
  Flex
} from '@adobe/react-spectrum';
import SimpleTaskList from './SimpleTaskList';
import SimpleAddTaskForm from './SimpleAddTaskForm';
import { Task, graphqlClient } from '../graphql/client';

const SimpleTodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await graphqlClient.getAllTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskDeleted = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <Grid
      areas={['header', 'content']}
      columns={['1fr']}
      rows={['size-1000', '1fr']}
      height="100vh"
      gap="size-200"
    >
      <View gridArea="header" backgroundColor="gray-100" padding="size-400">
        <Flex direction="column" alignItems="center">
          <Heading level={1} marginBottom="size-200">
            📝 Todo App
          </Heading>
          <Content>
            A simple task manager with real-time sync
          </Content>
        </Flex>
      </View>
      
      <View gridArea="content" padding="size-400">
        <Grid
          areas={['form', 'divider', 'tasks']}
          columns={['1fr']}
          rows={['auto', 'auto', '1fr']}
          gap="size-300"
          maxWidth="800px"
          marginX="auto"
        >
          <View gridArea="form">
            <SimpleAddTaskForm onTaskCreated={handleTaskCreated} />
          </View>
          
          <Divider gridArea="divider" size="M" />
          
          <View gridArea="tasks">
            {loading ? (
              <Flex justifyContent="center" alignItems="center" height="size-3000">
                <ProgressCircle aria-label="Loading tasks..." isIndeterminate />
              </Flex>
            ) : error ? (
              <IllustratedMessage>
                <Heading>Error</Heading>
                <Content>{error}</Content>
              </IllustratedMessage>
            ) : (
              <SimpleTaskList 
                tasks={tasks} 
                onTaskUpdated={handleTaskUpdated}
                onTaskDeleted={handleTaskDeleted}
              />
            )}
          </View>
        </Grid>
      </View>
    </Grid>
  );
};

export default SimpleTodoApp;
