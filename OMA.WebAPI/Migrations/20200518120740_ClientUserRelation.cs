using Microsoft.EntityFrameworkCore.Migrations;

namespace OMA.WebAPI.Migrations
{
    public partial class ClientUserRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Client",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Client_AppUserId",
                table: "Client",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_AspNetUsers_AppUserId",
                table: "Client",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_AspNetUsers_AppUserId",
                table: "Client");

            migrationBuilder.DropIndex(
                name: "IX_Client_AppUserId",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Client");
        }
    }
}
