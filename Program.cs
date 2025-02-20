using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Text;
using TourismApp.BussinessLayer;
using TourismApp.DataLayer;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container
        builder.Services.AddControllers()
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

        // Register the connection string explicitly as a string
        builder.Services.AddSingleton<string>(sp => builder.Configuration.GetConnectionString("TourismAppDB"));

        // Register the business layer services
        builder.Services.AddScoped<BLTour>();
        builder.Services.AddScoped<BLSignUp>();
        builder.Services.AddScoped<BLContact>();
        builder.Services.AddScoped<BLBookings>();
        builder.Services.AddScoped<SqlServerDb>(); // Add SqlServerDb to the DI container
        builder.Services.AddScoped<BLAdmin>();

        // JWT Authentication Configuration
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
                };
            });

        // Configure CORS policy
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy => policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod());
        });

        // Configure Swagger/OpenAPI
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Enable authentication and authorization middleware
        app.UseAuthentication(); // Use authentication middleware
        app.UseAuthorization();  // Use authorization middleware

        // Apply CORS policy
        app.UseCors("AllowFrontend");

        app.UseHttpsRedirection();

        // Map the controllers
        app.MapControllers();

        // Run the application
        app.Run();
    }
}
