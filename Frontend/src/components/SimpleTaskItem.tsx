import React, { useState } from 'react';
import {
  View,
  Flex,
  Text,
  ActionButton,
  Checkbox,
  Heading,
  StatusLight
} from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Clock from '@spectrum-icons/workflow/Clock';
import Delete from '@spectrum-icons/workflow/Delete';
import { Task, graphqlClient } from '../graphql/client';

interface SimpleTaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: number) => void;
}

const SimpleTaskItem: React.FC<SimpleTaskItemProps> = ({ 
  task, 
  onTaskUpdated, 
  onTaskDeleted 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusToggle = async () => {
    const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    
    try {
      setIsUpdating(true);
      const updatedTask = await graphqlClient.updateTaskStatus({
        id: task.id,
        status: newStatus
      });
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setIsDeleting(true);
        await graphqlClient.deleteTask(task.id);
        onTaskDeleted(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isCompleted = task.status === 'COMPLETED';

  return (
    <View
      backgroundColor="gray-50"
      borderWidth="thin"
      borderColor="gray-400"
      borderRadius="medium"
      padding="size-300"
      marginBottom="size-200"
    >
      <Flex direction="row" alignItems="start" gap="size-200">
        <Checkbox
          isSelected={isCompleted}
          onChange={handleStatusToggle}
          isDisabled={isUpdating}
          aria-label={`Mark task "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
        />
        
        <Flex direction="column" flex="1" gap="size-100">
          <Flex direction="row" alignItems="center" justifyContent="space-between">
            <Heading
              level={4}
              margin={0}
              UNSAFE_style={{
                textDecoration: isCompleted ? 'line-through' : 'none',
                opacity: isCompleted ? 0.7 : 1
              }}
            >
              {task.title}
            </Heading>
            
            <Flex direction="row" alignItems="center" gap="size-100">
              <StatusLight variant={isCompleted ? 'positive' : 'notice'}>
                {isCompleted ? 'Completed' : 'Pending'}
              </StatusLight>
              
              <ActionButton
                aria-label="Delete task"
                onPress={handleDelete}
                isDisabled={isDeleting}
                isQuiet
              >
                <Delete />
              </ActionButton>
            </Flex>
          </Flex>
          
          {task.description && (
            <Text
              UNSAFE_style={{
                opacity: isCompleted ? 0.7 : 1
              }}
            >
              {task.description}
            </Text>
          )}
          
          <Flex direction="row" alignItems="center" gap="size-200" marginTop="size-100">
            <Flex direction="row" alignItems="center" gap="size-75">
              <Clock size="S" />
              <Text variant="detail">
                Created: {formatDate(task.createdAt)}
              </Text>
            </Flex>
            
            {task.updatedAt && (
              <Flex direction="row" alignItems="center" gap="size-75">
                <CheckmarkCircle size="S" />
                <Text variant="detail">
                  Updated: {formatDate(task.updatedAt)}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};

export default SimpleTaskItem;
