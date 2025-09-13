import React from 'react';
import {
  View,
  Heading,
  Content,
  IllustratedMessage
} from '@adobe/react-spectrum';
import SimpleTaskItem from './SimpleTaskItem';
import { Task } from '../graphql/client';

interface SimpleTaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: number) => void;
}

const SimpleTaskList: React.FC<SimpleTaskListProps> = ({ 
  tasks, 
  onTaskUpdated, 
  onTaskDeleted 
}) => {
  if (!tasks || tasks.length === 0) {
    return (
      <IllustratedMessage>
        <Heading>No tasks yet</Heading>
        <Content>Create your first task using the form above.</Content>
      </IllustratedMessage>
    );
  }

  // Separate tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'PENDING');
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED');

  return (
    <View>
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <View marginBottom="size-400">
          <Heading level={3} marginBottom="size-200">
            📋 Pending Tasks ({pendingTasks.length})
          </Heading>
          <View backgroundColor="gray-50" padding="size-200" borderRadius="medium">
            {pendingTasks.map((task) => (
              <SimpleTaskItem 
                key={task.id} 
                task={task} 
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
              />
            ))}
          </View>
        </View>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <View>
          <Heading level={3} marginBottom="size-200">
            ✅ Completed Tasks ({completedTasks.length})
          </Heading>
          <View backgroundColor="green-100" padding="size-200" borderRadius="medium">
            {completedTasks.map((task) => (
              <SimpleTaskItem 
                key={task.id} 
                task={task} 
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default SimpleTaskList;
