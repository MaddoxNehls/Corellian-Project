using System.ComponentModel.DataAnnotations;
using TodoApp.Api.Models;

namespace TodoApp.Api.GraphQL.Types
{
    public class UpdateTaskStatusInput
    {
        [Required]
        public int Id { get; set; }
        
        [Required]
        public Models.TaskStatus Status { get; set; }
    }
}

