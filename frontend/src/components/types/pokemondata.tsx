export type PokemonData = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
    }
    moves: [
        {
            move: {
                name: string;
                url: string;
            }
        }
    ]
    stats: [
        {
            base_stat: number;
            stat: {
                name: string;
                url: string;
            }
        }
    ]
};