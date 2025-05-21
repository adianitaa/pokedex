"use client";

import { create } from "zustand";
import { FullPokemon } from "@/lib/zodSchemas";

interface FavoritesState {
    favorites: FullPokemon[];
    addFavorite: (pokemon: FullPokemon) => void;
    removeFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    favorites: [],
    addFavorite: (pokemon) => {
        const { favorites } = get();
        const exists = favorites.some((fav) => fav.id === pokemon.id);
        if (!exists) {
            set({ favorites: [...favorites, pokemon] });
        }
    },
    removeFavorite: (id) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((p) => p.id !== id) });
    },
}));
