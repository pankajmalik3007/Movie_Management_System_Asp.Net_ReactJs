using Domain_Library.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Context
{
    public class MainDbContext : DbContext
    {
        public DbSet<actor> actors { get; set; }
        public DbSet<director> directors { get; set; }
        public DbSet<genres> genres { get; set; }
        public DbSet<movie> movie { get; set; }
        public DbSet<movie_cast> movie_cast { get; set; }
        public DbSet<movie_direction> movie_direction { get; set; }
        public DbSet<movie_genres> movie_genres { get; set;}
        public DbSet<rating> rating { get; set; }
        public DbSet<reviewer> reviewer { get; set; }

        public MainDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<movie_cast>()
                .HasOne(a => a.actor)
                .WithMany(a =>a.movie_cast)
                .HasForeignKey(a =>a.act_id)
                 .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<movie_cast>()
                .HasOne(a => a.movie)
                .WithMany(a => a.mov_casts)
                .HasForeignKey(a => a.mov_id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<movie_direction>()
               .HasOne(a => a.movie)
               .WithMany(a => a.mov_directions)
               .HasForeignKey(a => a.mov_id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<movie_direction>()
              .HasOne(a => a.director)
              .WithMany(a => a.movie_directions)
              .HasForeignKey(a => a.dir_id)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<movie_genres>()
              .HasOne(a => a.movie)
              .WithMany(a => a.mov_genres)
              .HasForeignKey(a => a.mov_id)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<movie_genres>()
              .HasOne(a => a.genres)
              .WithMany(a => a.Movie_Genres)
              .HasForeignKey(a => a.gen_id)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<rating>()
               .HasOne(a => a.movie)
               .WithMany(a => a.mov_rating)
               .HasForeignKey(a => a.mov_id)
               .OnDelete(DeleteBehavior.Cascade); 


            modelBuilder.Entity<rating>()
             .HasOne(a => a.reviewer)
             .WithMany(a => a.rating)
             .HasForeignKey(a => a.rev_id)
              .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
