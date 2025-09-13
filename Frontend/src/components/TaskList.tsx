import React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import {
  View,
  Heading,
  Flex,
  Content,
  IllustratedMessage,
  ActionButton,
  Item,
  ListView
} from '@adobe/react-spectrum';
import TaskItem from './TaskItem';

const TaskListQuery = graphql`
  query TaskListQuery {
    getAllTasks {
      id
      title
      description
      status
      createdAt
      updatedAt
      ...TaskItem_task
    }
  }
`;

const TaskList: React.FC = () => {
  const data = useLazyLoadQuery(TaskListQuery, {});

  if (!data.getAllTasks || data.getAllTasks.length === 0) {
    return (
      <IllustratedMessage>
        <Heading>No tasks yet</Heading>
        <Content>Create your first task using the form above.</Content>
      </IllustratedMessage>
    );
  }

  // Separate tasks by status
  const pendingTasks = data.getAllTasks.filter(task => task.status === 'PENDING');
  const completedTasks = data.getAllTasks.filter(task => task.status === 'COMPLETED');

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
              <TaskItem key={task.id} task={task} />
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
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default TaskList;
