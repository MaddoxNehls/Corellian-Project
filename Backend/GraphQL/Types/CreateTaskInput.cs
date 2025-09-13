using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.GraphQL.Types
{
    public class CreateTaskInput
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(1000)]
        public string? Description { get; set; }
    }
}

