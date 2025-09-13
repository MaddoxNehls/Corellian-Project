// Simple GraphQL client without Relay for demo purposes
const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskStatusInput {
  id: number;
  status: 'PENDING' | 'COMPLETED';
}

class GraphQLClient {
  private async request<T>(query: string, variables?: any): Promise<T> {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error('GraphQL errors occurred');
    }

    return data.data;
  }

  async getAllTasks(): Promise<Task[]> {
    const query = `
      query GetAllTasks {
        getAllTasks {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
    `;
    
    const result = await this.request<{ getAllTasks: Task[] }>(query);
    return result.getAllTasks;
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    const mutation = `
      mutation CreateTask($input: CreateTaskInput!) {
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
    
    const result = await this.request<{ createTask: Task }>(mutation, { input });
    return result.createTask;
  }

  async updateTaskStatus(input: UpdateTaskStatusInput): Promise<Task> {
    const mutation = `
      mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
        updateTaskStatus(input: $input) {
          id
          title
          description
          status
          createdAt
          updatedAt
        }
      }
    `;
    
    const result = await this.request<{ updateTaskStatus: Task }>(mutation, { input });
    return result.updateTaskStatus;
  }

  async deleteTask(id: number): Promise<boolean> {
    const mutation = `
      mutation DeleteTask($id: Int!) {
        deleteTask(id: $id)
      }
    `;
    
    const result = await this.request<{ deleteTask: boolean }>(mutation, { id });
    return result.deleteTask;
  }
}

export const graphqlClient = new GraphQLClient();
