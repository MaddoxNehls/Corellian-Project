using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
        {
        }

        public DbSet<TaskItem> Tasks { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Status).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
                
                // Convert enum to string in database
                entity.Property(e => e.Status)
                    .HasConversion<string>();
            });

            // Seed some initial data
            modelBuilder.Entity<TaskItem>().HasData(
                new TaskItem
                {
                    Id = 1,
                    Title = "Welcome to TodoApp",
                    Description = "This is your first task. Try marking it as completed!",
                    Status = Models.TaskStatus.Pending,
                    CreatedAt = DateTime.UtcNow
                },
                new TaskItem
                {
                    Id = 2,
                    Title = "Create a new task",
                    Description = "Use the form above to create your own tasks",
                    Status = Models.TaskStatus.Pending,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}

