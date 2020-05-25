using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iCollect.Migrations
{
    public partial class SwitchHosting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sysdiagrams");

            migrationBuilder.DropIndex(
                name: "IX_AlbumCollections_CollectionId",
                table: "AlbumCollections");

            migrationBuilder.AddColumn<int>(
                name: "AlbumId",
                table: "UserItems",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Sets",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceEstimated",
                table: "Items",
                type: "money",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CollectionTypeId",
                table: "Collections",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Collections",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "jsonRanges",
                table: "Albums",
                maxLength: 1024,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "jsonSetTypes",
                table: "Albums",
                maxLength: 1024,
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CollectionId",
                table: "AlbumCollections",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "AlbumCollections",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AlbumCollections",
                table: "AlbumCollections",
                columns: new[] { "CollectionId", "AlbumId" });

            migrationBuilder.CreateTable(
                name: "CollectionTypes",
                columns: table => new
                {
                    CollectionTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(maxLength: 255, nullable: true)
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

            migrationBuilder.DropPrimaryKey(
                name: "PK_AlbumCollections",
                table: "AlbumCollections");

            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "UserItems");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Sets");

            migrationBuilder.DropColumn(
                name: "PriceEstimated",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "CollectionTypeId",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "jsonRanges",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "jsonSetTypes",
                table: "Albums");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "AlbumCollections",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "CollectionId",
                table: "AlbumCollections",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "sysdiagrams",
                columns: table => new
                {
                    definition = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    diagram_id = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    principal_id = table.Column<int>(type: "int", nullable: false),
                    version = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumCollections_CollectionId",
                table: "AlbumCollections",
                column: "CollectionId");
        }
    }
}
