using Microsoft.EntityFrameworkCore.Migrations;

namespace iCollect.Migrations
{
    public partial class Rebuild2Home : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AlbumId",
                table: "UserItems",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Sets",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CollectionTypeId",
                table: "Collections",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Collections",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Albums",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CollectionTypes",
                columns: table => new
                {
                    CollectionTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionTypes", x => x.CollectionTypeId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserItems_AlbumId",
                table: "UserItems",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_Collections_CollectionTypeId",
                table: "Collections",
                column: "CollectionTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Collections_CollectionTypes",
                table: "Collections",
                column: "CollectionTypeId",
                principalTable: "CollectionTypes",
                principalColumn: "CollectionTypeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserItems_Albums",
                table: "UserItems",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "AlbumId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Collections_CollectionTypes",
                table: "Collections");

            migrationBuilder.DropForeignKey(
                name: "FK_UserItems_Albums",
                table: "UserItems");

            migrationBuilder.DropTable(
                name: "CollectionTypes");

            migrationBuilder.DropIndex(
                name: "IX_UserItems_AlbumId",
                table: "UserItems");

            migrationBuilder.DropIndex(
                name: "IX_Collections_CollectionTypeId",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "UserItems");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Sets");

            migrationBuilder.DropColumn(
                name: "CollectionTypeId",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Albums");
        }
    }
}
