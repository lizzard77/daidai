<script>
    import * as signalR from "@microsoft/signalr";
    import Field from './lib/Field.svelte';
    import { onMount } from 'svelte';
    import { cards, clientId } from './stores';
    
    localStorage.setItem("clientId", $clientId.toString());
    let connection;

    onMount(() => {
        connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        connection.on("messageReceived", (username, message) => 
            { 
                if (username === $clientId)
                    return;
                const isCards = JSON.parse(message);
                if (isCards instanceof Array)
                {
                    console.log("got cards");
                    $cards = isCards;
                }
                else
                    console.log(message);
                cards.flip(message);
            });

        connection.start()
            .then(c => {
                console.log("connected");
                connection.send("NewMessage", $clientId, "login")
                    .then(c => console.log("send"))
                    .catch(e => console.log(e));
            })
            .catch((err) => console.log(err));
    });

    function send(data) {
        try
        {
            connection.send("NewMessage", $clientId, data)
                    .then(c => console.log("send"))
                    .catch(e => console.log(e));
        } 
        catch (e)
        {
            console.log(e);
        }
    }

    function broadcast(e)
    {
        const { detail } = e;
        console.log(detail);
        send(JSON.stringify(detail))
    }

</script>

<Field on:broadcast={broadcast} />