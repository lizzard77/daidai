using daidai.ChatHub;
//((using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddCors();
//builder.Services.AddSpaStaticFiles();

var app = builder.Build();
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
});
/*app.UseSpa(spa =>
{
    spa.Options.SourcePath = "src";
    spa.Options.DevServerPort = 3000;
    spa.Options.PackageManagerCommand = "npm run dev";
    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
});*/

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapHub<ChatHub>("/hub");

app.Run();
