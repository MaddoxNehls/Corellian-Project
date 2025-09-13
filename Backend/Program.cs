using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.GraphQL.Queries;
using TodoApp.Api.GraphQL.Mutations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add GraphQL services
builder.Services
    .AddGraphQLServer()
    .AddQueryType<TaskQueries>()
    .AddMutationType<TaskMutations>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://frontend:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Add controllers and API explorer
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

// Enable CORS
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();

// Map GraphQL endpoint
app.MapGraphQL("/graphql");

// Map controllers
app.MapControllers();

// Ensure database is created and seeded
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    try
    {
        context.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        // Log the exception but don't fail startup
        Console.WriteLine($"Database initialization failed: {ex.Message}");
    }
}

// Add a health check endpoint
app.MapGet("/health", () => new { Status = "Healthy", Timestamp = DateTime.UtcNow });

app.Run();

