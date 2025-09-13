import React from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import {
  View,
  Flex,
  Text,
  ActionButton,
  Checkbox,
  Content,
  Heading,
  StatusLight,
  ContextualHelp,
  Button
} from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Clock from '@spectrum-icons/workflow/Clock';
import Delete from '@spectrum-icons/workflow/Delete';

const TaskItemFragment = graphql`
  fragment TaskItem_task on TaskType {
    id
    title
    description
    status
    createdAt
    updatedAt
  }
`;

const UpdateTaskStatusMutation = graphql`
  mutation TaskItemUpdateStatusMutation($input: UpdateTaskStatusInput!) {
    updateTaskStatus(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

const DeleteTaskMutation = graphql`
  mutation TaskItemDeleteMutation($id: Int!) {
    deleteTask(id: $id)
  }
`;

interface TaskItemProps {
  task: any;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const taskData = useFragment(TaskItemFragment, task);
  
  const [updateTaskStatus, isUpdatingStatus] = useMutation(UpdateTaskStatusMutation);
  const [deleteTask, isDeletingTask] = useMutation(DeleteTaskMutation);

  const handleStatusToggle = () => {
    const newStatus = taskData.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    
    updateTaskStatus({
      variables: {
        input: {
          id: taskData.id,
          status: newStatus
        }
      },
      // Simplified without optimistic updates for now
      onCompleted: () => {
        // Optionally refresh the query or show success message
      },
      onError: (error) => {
        console.error('Failed to update task status:', error);
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask({
        variables: {
          id: taskData.id
        },
        // Simplified without optimistic updates for now
        onCompleted: () => {
          // Task deleted successfully
        },
        onError: (error) => {
          console.error('Failed to delete task:', error);
        }
      });
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

  const isCompleted = taskData.status === 'COMPLETED';

  return (
    <View
      backgroundColor="white"
      borderWidth="thin"
      borderColor="gray-300"
      borderRadius="medium"
      padding="size-300"
      marginBottom="size-200"
    >
      <Flex direction="row" alignItems="start" gap="size-200">
        <Checkbox
          isSelected={isCompleted}
          onChange={handleStatusToggle}
          isDisabled={isUpdatingStatus}
          aria-label={`Mark task "${taskData.title}" as ${isCompleted ? 'pending' : 'completed'}`}
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
              {taskData.title}
            </Heading>
            
            <Flex direction="row" alignItems="center" gap="size-100">
              <StatusLight variant={isCompleted ? 'positive' : 'notice'}>
                {isCompleted ? 'Completed' : 'Pending'}
              </StatusLight>
              
              <ActionButton
                aria-label="Delete task"
                onPress={handleDelete}
                isDisabled={isDeletingTask}
                isQuiet
              >
                <Delete />
              </ActionButton>
            </Flex>
          </Flex>
          
          {taskData.description && (
            <Text
              UNSAFE_style={{
                opacity: isCompleted ? 0.7 : 1
              }}
            >
              {taskData.description}
            </Text>
          )}
          
          <Flex direction="row" alignItems="center" gap="size-200" marginTop="size-100">
            <Flex direction="row" alignItems="center" gap="size-75">
              <Clock size="S" />
              <Text variant="detail">
                Created: {formatDate(taskData.createdAt)}
              </Text>
            </Flex>
            
            {taskData.updatedAt && (
              <Flex direction="row" alignItems="center" gap="size-75">
                <CheckmarkCircle size="S" />
                <Text variant="detail">
                  Updated: {formatDate(taskData.updatedAt)}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};

export default TaskItem;

