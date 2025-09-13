using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.GraphQL.Types;
using TodoApp.Api.Models;

namespace TodoApp.Api.GraphQL.Mutations
{
    [MutationType]
    public class TaskMutations
    {
        /// <summary>
        /// Creates a new task
        /// </summary>
        public async Task<TaskType> CreateTask([Service] TodoDbContext context, CreateTaskInput input)
        {
            var task = new TaskItem
            {
                Title = input.Title.Trim(),
                Description = input.Description?.Trim(),
                Status = Models.TaskStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync();

            return TaskType.FromTaskItem(task);
        }

        /// <summary>
        /// Updates the status of an existing task
        /// </summary>
        public async Task<TaskType?> UpdateTaskStatus([Service] TodoDbContext context, UpdateTaskStatusInput input)
        {
            var task = await context.Tasks.FindAsync(input.Id);
            
            if (task == null)
            {
                throw new GraphQLException($"Task with ID {input.Id} not found.");
            }

            task.Status = input.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            return TaskType.FromTaskItem(task);
        }

        /// <summary>
        /// Deletes a task
        /// </summary>
        public async Task<bool> DeleteTask([Service] TodoDbContext context, int id)
        {
            var task = await context.Tasks.FindAsync(id);
            
            if (task == null)
            {
                return false;
            }

            context.Tasks.Remove(task);
            await context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Updates task title and description
        /// </summary>
        public async Task<TaskType?> UpdateTask([Service] TodoDbContext context, int id, CreateTaskInput input)
        {
            var task = await context.Tasks.FindAsync(id);
            
            if (task == null)
            {
                throw new GraphQLException($"Task with ID {id} not found.");
            }

            task.Title = input.Title.Trim();
            task.Description = input.Description?.Trim();
            task.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            return TaskType.FromTaskItem(task);
        }
    }
}

