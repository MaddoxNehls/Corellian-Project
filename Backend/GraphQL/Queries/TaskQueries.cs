using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.GraphQL.Types;

namespace TodoApp.Api.GraphQL.Queries
{
    [QueryType]
    public class TaskQueries
    {
        /// <summary>
        /// Gets all tasks from the database
        /// </summary>
        public async Task<IEnumerable<TaskType>> GetAllTasks([Service] TodoDbContext context)
        {
            var tasks = await context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return tasks.Select(TaskType.FromTaskItem);
        }

        /// <summary>
        /// Gets a specific task by ID
        /// </summary>
        public async Task<TaskType?> GetTaskById([Service] TodoDbContext context, int id)
        {
            var task = await context.Tasks.FindAsync(id);
            return task != null ? TaskType.FromTaskItem(task) : null;
        }

        /// <summary>
        /// Gets tasks filtered by status
        /// </summary>
        public async Task<IEnumerable<TaskType>> GetTasksByStatus([Service] TodoDbContext context, Models.TaskStatus status)
        {
            var tasks = await context.Tasks
                .Where(t => t.Status == status)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return tasks.Select(TaskType.FromTaskItem);
        }
    }
}

