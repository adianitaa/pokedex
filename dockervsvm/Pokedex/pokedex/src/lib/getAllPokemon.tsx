import axios from "axios";
import { pokemonListSchema, type PokemonList } from "./zodSchemas";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getAllPokemon = async (offset = 0, limit = 20): Promise<PokemonList> => {
    try {
        const res = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

        const parsed = pokemonListSchema.safeParse(res.data);
        if (!parsed.success) {
            throw new Error("Datos de lista de Pokémon inválidos");
        }

        return parsed.data;
    } catch (error) {
        console.error("Error al obtener lista de Pokémon:", error);
        throw new Error("Error al obtener lista de Pokémon");
    }
};
