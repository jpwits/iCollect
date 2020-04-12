using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iCollect.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Collections",
                columns: table => new
                {
                    CollectionId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
                    Description = table.Column<string>(unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Collections", x => x.CollectionId);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    ImageId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    del_ItemId = table.Column<int>(nullable: true),
                    Image = table.Column<byte[]>(type: "image", nullable: true),
                    Type = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.ImageId);
                });

            migrationBuilder.CreateTable(
                name: "Sets",
                columns: table => new
                {
                    SetId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CollectionId = table.Column<int>(nullable: true),
                    Year = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 100, nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: true),
                    Range = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    CatCode = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    SetType = table.Column<string>(unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sets", x => x.SetId);
                    table.ForeignKey(
                        name: "FK_Sets_Collections",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "CollectionId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(maxLength: 100, nullable: true),
                    SetId = table.Column<int>(nullable: false),
                    Thumbnail = table.Column<byte[]>(type: "image", nullable: true),
                    del_Image = table.Column<byte[]>(type: "image", nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    Position = table.Column<int>(nullable: true),
                    Type = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    Denominator = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    Mass = table.Column<decimal>(type: "decimal(18, 3)", nullable: true),
                    MetalContent = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
                    Dimention = table.Column<decimal>(type: "decimal(18, 3)", nullable: true),
                    Weight = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    ImageIdA = table.Column<int>(nullable: true),
                    ImageIdB = table.Column<int>(nullable: true),
                    ThumbnailA = table.Column<byte[]>(type: "image", nullable: true),
                    ThumbnailB = table.Column<byte[]>(type: "image", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SetImages", x => x.ItemId);
                    table.ForeignKey(
                        name: "FK_Items_Images",
                        column: x => x.ImageIdA,
                        principalTable: "Images",
                        principalColumn: "ImageId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Items_Images1",
                        column: x => x.ImageIdB,
                        principalTable: "Images",
                        principalColumn: "ImageId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Items_Sets",
                        column: x => x.SetId,
                        principalTable: "Sets",
                        principalColumn: "SetId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(unicode: false, maxLength: 255, nullable: false),
                    ItemId = table.Column<int>(nullable: false),
                    Quantity = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserItems_Items",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Items_ImageIdA",
                table: "Items",
                column: "ImageIdA");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ImageIdB",
                table: "Items",
                column: "ImageIdB");

            migrationBuilder.CreateIndex(
                name: "IX_SetImages_setId",
                table: "Items",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_Sets_CollectionId",
                table: "Sets",
                column: "CollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserItems_ItemId",
                table: "UserItems",
                column: "ItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserItems");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Sets");

            migrationBuilder.DropTable(
                name: "Collections");
        }
    }
}
