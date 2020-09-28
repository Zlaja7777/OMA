#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["OMA.WebAPI/OMA.WebAPI.csproj", "OMA.WebAPI/"]
RUN dotnet restore "OMA.WebAPI/OMA.WebAPI.csproj"
COPY . .
WORKDIR "/src/OMA.WebAPI"
RUN dotnet build "OMA.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "OMA.WebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OMA.WebAPI.dll"]