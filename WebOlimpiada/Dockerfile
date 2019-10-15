FROM microsoft/dotnet:2.2-sdk-alpine AS builder
WORKDIR /source
EXPOSE 80
#EXPOSE 5001

#RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
#RUN apt-get install -y nodejs
RUN apk --no-cache add nodejs nodejs-npm

COPY *.csproj .
RUN dotnet restore

COPY ./ ./

RUN dotnet publish "./WebOlimpiada.csproj" --output "./dist" --configuration Release --no-restore
FROM microsoft/dotnet:2.2-aspnetcore-runtime-alpine

WORKDIR /app
COPY --from=builder /source/dist .

ENTRYPOINT ["dotnet", "WebOlimpiada.dll"]