export type PokemonData = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
    }
    moves: {
        move: {
            name: string;
            power: number | 0;
            url: string;
        };
    }[];

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