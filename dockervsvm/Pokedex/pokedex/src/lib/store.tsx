import { create } from "zustand";
import { FullPokemon } from "./zodSchemas";

interface FavoriteStore {
    favorites: FullPokemon[];
    addFavorite: (pokemon: FullPokemon) => void;
    removeFavorite: (pokemonId: number) => void;
    isFavorite: (pokemonId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
    favorites: [],
    addFavorite: (pokemon) => {
        const { favorites } = get();
        const alreadyExists = favorites.some((p) => p.id === pokemon.id);
        if (!alreadyExists) {
            set({ favorites: [...favorites, pokemon] });
        }
    },
    removeFavorite: (pokemonId) =>
        set((state) => ({
            favorites: state.favorites.filter((p) => p.id !== pokemonId),
        })),
    isFavorite: (pokemonId) => get().favorites.some((p) => p.id === pokemonId),
}));
