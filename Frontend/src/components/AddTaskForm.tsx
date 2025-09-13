import React, { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import {
  Form,
  TextField,
  TextArea,
  Button,
  Flex,
  View,
  Heading,
  Content,
  AlertDialog,
  DialogTrigger,
  ActionButton
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';

const CreateTaskMutation = graphql`
  mutation AddTaskFormCreateMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [createTask, isCreatingTask] = useMutation(CreateTaskMutation);

  // Validate form
  React.useEffect(() => {
    setIsFormValid(title.trim().length > 0);
  }, [title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    const taskInput = {
      title: title.trim(),
      description: description.trim() || null
    };

    createTask({
      variables: {
        input: taskInput
      },
      // Simplified without optimistic updates for now
      onCompleted: () => {
        // Reset form
        setTitle('');
        setDescription('');
      },
      onError: (error) => {
        console.error('Failed to create task:', error);
        // You could show an error toast here
      }
    });
  };

  return (
    <View
      backgroundColor="white"
      borderWidth="thin"
      borderColor="gray-300"
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
              isDisabled={!isFormValid || isCreatingTask}
              isPending={isCreatingTask}
            >
              <Add />
              {isCreatingTask ? 'Adding...' : 'Add Task'}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </View>
  );
};

export default AddTaskForm;

