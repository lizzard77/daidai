using Microsoft.AspNetCore.SignalR;

namespace daidai.ChatHub
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(long username, string message) 
        {
            Console.WriteLine($"{username} said: {message}");
            await Clients.All.SendAsync("messageReceived", username, message);
        }
    }
}