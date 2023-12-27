using Infrastructure_Library.Context;
using Infrastructure_Library.Repositories;
using Infrastructure_Library.Services.Custom_Services.ActorServices;
using Infrastructure_Library.Services.Custom_Services.DirectorServices;
using Infrastructure_Library.Services.Custom_Services.GenresServices;
using Infrastructure_Library.Services.Custom_Services.Movie_CastServices;
using Infrastructure_Library.Services.Custom_Services.Movie_GenresServices;
using Infrastructure_Library.Services.Custom_Services.MovieDirectionServices;
using Infrastructure_Library.Services.Custom_Services.MovieServices;
using Infrastructure_Library.Services.Custom_Services.RatingServices;
using Infrastructure_Library.Services.Custom_Services.ReviewerServices;
using Infrastructure_Library.Services.Genral_Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MainDbContext>(options => options
.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddLogging(builder =>
{
    builder.AddConsole();

});
    

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});



builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddTransient(typeof(IService<>), typeof(Service<>));
builder.Services.AddTransient(typeof(IActorService), typeof(ActorService));
builder.Services.AddTransient(typeof(IDirectorService), typeof(DirectorService));
builder.Services.AddTransient(typeof(IMovieService), typeof(MovieService));
builder.Services.AddTransient(typeof(IGenresService), typeof(GenresService));
builder.Services.AddTransient(typeof(IMovi_CastService), typeof(Movi_CastService));
builder.Services.AddTransient(typeof(IReviewerService), typeof(ReviewerServices));
builder.Services.AddTransient(typeof(IMovie_Generes), typeof(Movie_Generes));
builder.Services.AddTransient(typeof(IMovieDirection), typeof(MovieDirection));
builder.Services.AddTransient(typeof(IRatingService), typeof(RatingService));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseDeveloperExceptionPage();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApi v1"));
}

app.UseHttpsRedirection();
app.UseCors("AllowOrigin");
app.UseAuthorization();

app.MapControllers();

app.Run();
