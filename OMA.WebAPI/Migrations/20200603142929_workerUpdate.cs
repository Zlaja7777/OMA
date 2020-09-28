using Microsoft.EntityFrameworkCore.Migrations;

namespace OMA.WebAPI.Migrations
{
    public partial class workerUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "Worker",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Availability",
                table: "Worker",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BankAccountNumber",
                table: "Worker",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Worker",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "MaxHoursPerMonthActual",
                table: "Worker",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "MaxHoursPerMonthBudgeted",
                table: "Worker",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "MaxHoursPerWeek",
                table: "Worker",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Worker",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Worker_AddressId",
                table: "Worker",
                column: "AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Worker_Address_AddressId",
                table: "Worker",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Worker_Address_AddressId",
                table: "Worker");

            migrationBuilder.DropIndex(
                name: "IX_Worker_AddressId",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "Availability",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "BankAccountNumber",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "MaxHoursPerMonthActual",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "MaxHoursPerMonthBudgeted",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "MaxHoursPerWeek",
                table: "Worker");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Worker");
        }
    }
}
