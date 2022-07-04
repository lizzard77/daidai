import { writable, derived, get } from "svelte/store";



function createCardsStore() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
        set,
        update,
		flip: (id) => {
            const allCards = get(cards);
            let card = allCards.find(c => c.id == id);
            if (card)
            {
                console.log(card);
                card.showFront = true;
                set(allCards);
            }
        }
	};
}

export const cards = createCardsStore();
export const clientId = writable(parseInt(localStorage.getItem("clientId")) || Math.trunc(Math.random()*100000));