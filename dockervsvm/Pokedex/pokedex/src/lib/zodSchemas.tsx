import { z } from "zod";

//respuesta completa del Pokémon
export const fullPokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    sprites: z.object({
        front_default: z.string().nullable(),
        other: z.object({
            ["official-artwork"]: z.object({
                front_default: z.string().nullable(),
            }),
        }).optional(),
    }),
    types: z.array(
        z.object({
            type: z.object({
                name: z.string(),
            }),
        })
    ),
    abilities: z.array(
        z.object({
            ability: z.object({
                name: z.string(),
            }),
        })
    ),
    stats: z.array(
        z.object({
            base_stat: z.number(),
            stat: z.object({
                name: z.string(),
            }),
        })
    ),
    height: z.number(),
    weight: z.number(),
});

//esquema para la respuesta de lista de Pokémon
export const pokemonListSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(
        z.object({
            name: z.string(),
            url: z.string(),
        })
    ),
});

export type FullPokemon = z.infer<typeof fullPokemonSchema>;
export type PokemonList = z.infer<typeof pokemonListSchema>;
