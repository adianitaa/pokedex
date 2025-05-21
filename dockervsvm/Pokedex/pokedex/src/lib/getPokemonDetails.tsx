import { fullPokemonSchema, type FullPokemon } from "./zodSchemas";

export const getPokemonDetails = async (url: string): Promise<FullPokemon> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener detalles del Pokémon");

    const data = await res.json();

    const parsed = fullPokemonSchema.safeParse(data);
    if (!parsed.success) throw new Error("Datos de Pokémon inválidos");

    return parsed.data;
};
