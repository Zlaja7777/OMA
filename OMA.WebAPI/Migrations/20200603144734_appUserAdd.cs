using Microsoft.EntityFrameworkCore.Migrations;

namespace OMA.WebAPI.Migrations
{
    public partial class appUserAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Worker_Address_AddressId",
                table: "Worker");

            migrationBuilder.AlterColumn<int>(
                name: "AddressId",
                table: "Worker",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Worker",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Worker_AppUserId",
                table: "Worker",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Worker_Address_AddressId",
                table: "Worker",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Worker_AspNetUsers_AppUserId",
                table: "Worker",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Worker_Address_AddressId",
                table: "Worker");

            migrationBuilder.DropForeignKey(
                name: "FK_Worker_AspNetUsers_AppUserId",
                table: "Worker");

            migrationBuilder.DropIndex(
                name: "IX_Worker_AppUserId",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Worker");

            migrationBuilder.AlterColumn<int>(
                name: "AddressId",
                table: "Worker",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Worker_Address_AddressId",
                table: "Worker",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
