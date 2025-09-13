import React, { Suspense } from 'react';
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
// import Error from '@spectrum-icons/illustrations/Error';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

const TodoApp: React.FC = () => {
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
            <Suspense
              fallback={
                <Flex justifyContent="center" alignItems="center" height="size-2000">
                  <ProgressCircle aria-label="Loading..." isIndeterminate />
                </Flex>
              }
            >
              <AddTaskForm />
            </Suspense>
          </View>
          
          <Divider gridArea="divider" size="M" />
          
          <View gridArea="tasks">
            <Suspense
              fallback={
                <Flex justifyContent="center" alignItems="center" height="size-3000">
                  <ProgressCircle aria-label="Loading tasks..." isIndeterminate />
                </Flex>
              }
            >
              <TaskList />
            </Suspense>
          </View>
        </Grid>
      </View>
    </Grid>
  );
};

export default TodoApp;

