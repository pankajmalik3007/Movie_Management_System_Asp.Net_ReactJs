using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure_Library.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "actors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    act_firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    act_lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    act_gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    act_dob = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_actors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "directors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dir_firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dir_lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dir_dob = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_directors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "genres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    gen_title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_genres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    mov_title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mov_year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mov_time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mov_language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mov_dt_rel = table.Column<DateTime>(type: "datetime2", nullable: false),
                    mov_rel_country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    num_of_rating = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "reviewer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rev_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rev_dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    rev_address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rev_country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rev_state = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rev_city = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rev_pincode = table.Column<int>(type: "int", nullable: false),
                    rev_phone_no = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reviewer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "movie_cast",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    act_id = table.Column<int>(type: "int", nullable: false),
                    mov_id = table.Column<int>(type: "int", nullable: false),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie_cast", x => x.Id);
                    table.ForeignKey(
                        name: "FK_movie_cast_actors_act_id",
                        column: x => x.act_id,
                        principalTable: "actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_movie_cast_movie_mov_id",
                        column: x => x.mov_id,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "movie_direction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dir_id = table.Column<int>(type: "int", nullable: false),
                    mov_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie_direction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_movie_direction_directors_dir_id",
                        column: x => x.dir_id,
                        principalTable: "directors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_movie_direction_movie_mov_id",
                        column: x => x.mov_id,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "movie_genres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    mov_id = table.Column<int>(type: "int", nullable: false),
                    gen_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie_genres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_movie_genres_genres_gen_id",
                        column: x => x.gen_id,
                        principalTable: "genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_movie_genres_movie_mov_id",
                        column: x => x.mov_id,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "rating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    mov_id = table.Column<int>(type: "int", nullable: false),
                    rev_id = table.Column<int>(type: "int", nullable: false),
                    rev_stars = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_rating_movie_mov_id",
                        column: x => x.mov_id,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_rating_reviewer_rev_id",
                        column: x => x.rev_id,
                        principalTable: "reviewer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_movie_cast_act_id",
                table: "movie_cast",
                column: "act_id");

            migrationBuilder.CreateIndex(
                name: "IX_movie_cast_mov_id",
                table: "movie_cast",
                column: "mov_id");

            migrationBuilder.CreateIndex(
                name: "IX_movie_direction_dir_id",
                table: "movie_direction",
                column: "dir_id");

            migrationBuilder.CreateIndex(
                name: "IX_movie_direction_mov_id",
                table: "movie_direction",
                column: "mov_id");

            migrationBuilder.CreateIndex(
                name: "IX_movie_genres_gen_id",
                table: "movie_genres",
                column: "gen_id");

            migrationBuilder.CreateIndex(
                name: "IX_movie_genres_mov_id",
                table: "movie_genres",
                column: "mov_id");

            migrationBuilder.CreateIndex(
                name: "IX_rating_mov_id",
                table: "rating",
                column: "mov_id");

            migrationBuilder.CreateIndex(
                name: "IX_rating_rev_id",
                table: "rating",
                column: "rev_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movie_cast");

            migrationBuilder.DropTable(
                name: "movie_direction");

            migrationBuilder.DropTable(
                name: "movie_genres");

            migrationBuilder.DropTable(
                name: "rating");

            migrationBuilder.DropTable(
                name: "actors");

            migrationBuilder.DropTable(
                name: "directors");

            migrationBuilder.DropTable(
                name: "genres");

            migrationBuilder.DropTable(
                name: "movie");

            migrationBuilder.DropTable(
                name: "reviewer");
        }
    }
}
