using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(1000)]
        public string? Description { get; set; }
        
        [Required]
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
    }
    
    public enum TaskStatus
    {
        Pending,
        Completed
    }
}

