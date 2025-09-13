import React, { useState } from 'react';
import {
  Form,
  TextField,
  TextArea,
  Button,
  Flex,
  View,
  Heading,
  Content
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import { Task, graphqlClient } from '../graphql/client';

interface SimpleAddTaskFormProps {
  onTaskCreated: (task: Task) => void;
}

const SimpleAddTaskForm: React.FC<SimpleAddTaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Validate form
  React.useEffect(() => {
    setIsFormValid(title.trim().length > 0);
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    const taskInput = {
      title: title.trim(),
      description: description.trim() || undefined
    };

    try {
      setIsCreating(true);
      const newTask = await graphqlClient.createTask(taskInput);
      onTaskCreated(newTask);
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create task:', error);
      // You could show an error toast here
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <View
      backgroundColor="gray-50"
      borderWidth="thin"
      borderColor="gray-400"
      borderRadius="medium"
      padding="size-400"
    >
      <Heading level={3} marginBottom="size-300">
        ➕ Add New Task
      </Heading>
      
      <Form onSubmit={handleSubmit} maxWidth="100%">
        <Flex direction="column" gap="size-300">
          <TextField
            label="Task Title"
            placeholder="What needs to be done?"
            value={title}
            onChange={setTitle}
            isRequired
            maxLength={200}
            validationState={title.trim().length === 0 && title.length > 0 ? 'invalid' : 'valid'}
            errorMessage={title.trim().length === 0 && title.length > 0 ? 'Title cannot be empty' : ''}
            autoFocus
          />
          
          <TextArea
            label="Description (Optional)"
            placeholder="Add more details about this task..."
            value={description}
            onChange={setDescription}
            maxLength={1000}
            height="size-1200"
          />
          
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Content>
              {title.length > 0 && (
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {title.length}/200 characters
                </span>
              )}
            </Content>
            
            <Button
              variant="accent"
              type="submit"
              isDisabled={!isFormValid || isCreating}
              isPending={isCreating}
            >
              <Add />
              {isCreating ? 'Adding...' : 'Add Task'}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </View>
  );
};

export default SimpleAddTaskForm;
