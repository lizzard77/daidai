<script>
	import Found from "./Found.svelte";
	import Card from "./Card.svelte";

    let cards = [];
    let found = [];
    let won = false;

    for (let i = 0; i < 16; i++) {        
        let rnd = Math.trunc(Math.random()*100)%8;
        while (cards.filter(f => f.front === rnd).length > 1) {
            rnd = Math.trunc(Math.random()*100)%8;
        }
        cards.push({ front: rnd, back: "???", showFront: false, id: i })
    }

    function cardFlipped(e)
    {
        const showing = cards.filter(f => f.showFront);
        if (showing.length === 2) {
            if (showing[0].front === showing[1].front) {
                showing[0].found = true;
                showing[1].found = true;
                found = [ ...found, showing[0] ];
                cards.forEach(f => f.showFront = false);
                if (found.length === cards.length/2) {
                    won = true;
                }
                return;
            }

            setTimeout(() => {
                cards.forEach(f => f.showFront = false);
                cards = cards;
            }, 800);
        }
    }
</script>

<div class="flex flex-col h-screen">
    <div class="bg-black text-white flex flex-row p-2">
        <div class="flex-1"></div>
        <div><img src="https://i.pravatar.cc/64?u=test@test.de" class="rounded-full" alt="Avatar" /></div>
    </div>

    <div class="flex-1 bg-slate-400 pt-4 flex flex-col md:flex-row justify-center items-center">

        {#if won}
        <h1 class="absolute bg-white p-8 top-1/2 text-5xl text-red-600 z-50">Gewonnen!!</h1>
        {/if}

        <div class="m-8 flex flex-row flex-wrap w-[420px]">
            {#each cards as card}
            <Card front={card.front} back={card.back} found={card.found} bind:showFront={card.showFront} on:flip={cardFlipped} />
            {/each}
        </div>

        <div class="m-8 flex flex-wrap flex-row md:flex-col h-48 md:w-48">
            {#each found as f}
            <Found front={f.front} />
            {/each}
        </div>
    </div>

    <div class="w-full bg-slate-100 h-8 flex-initial">
        <p>playdaidai</p>
    </div>
</div>