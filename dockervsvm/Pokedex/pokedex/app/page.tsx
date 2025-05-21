"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { fullPokemonSchema, FullPokemon } from "@/lib/zodSchemas";
import { useFavoritesStore } from "@/store/store";
import { typeColors } from "@/lib/pokemonTypeColors";

interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Home() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [pokemonList, setPokemonList] = useState<FullPokemon[]>([]);

    const limit = 20;
    const offset = (page - 1) * limit;

    const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

    const { data, error } = useSWR<PokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        fetcher
    );

    useEffect(() => {
        async function fetchPokemonDetails() {
            if (!data?.results) {
                setPokemonList([]);
                return;
            }

            try {
                const detailedPokemons = await Promise.all(
                    data.results.map(async (p) => {
                        const res = await axios.get(p.url);
                        const parsed = fullPokemonSchema.safeParse(res.data);
                        if (parsed.success) return parsed.data;
                        return null;
                    })
                );

                let filtered = detailedPokemons.filter(
                    (p): p is FullPokemon => p !== null
                );

                if (selectedType) {
                    filtered = filtered.filter((p) =>
                        p.types.some((t) => t.type.name === selectedType)
                    );
                }

                if (searchTerm.trim()) {
                    const lower = searchTerm.toLowerCase();
                    filtered = filtered.filter((p) =>
                        p.name.toLowerCase().includes(lower)
                    );
                }

                setPokemonList(filtered);
            } catch {
                setPokemonList([]);
            }
        }

        fetchPokemonDetails();
    }, [data, searchTerm, selectedType]);

    if (error) return <div>Error al cargar los datos</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-3xl text-center font-bold mb-6">Pokédex</h1>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full sm:w-1/3"
                />
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="border p-2 rounded w-full sm:w-1/3"
                >
                    <option value="">All types</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="fighting">Fighting</option>
                    <option value="ghost">Ghost</option>
                    <option value="dragon">Dragon</option>
                    <option value="bug">Bug</option>
                    <option value="rock">Rock</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                    <option value="normal">Normal</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="flying">Flying</option>
                    <option value="steel">Steel</option>
                    <option value="ice">Ice</option>
                </select>
            </div>

            {/* Lista */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pokemonList.map((pokemon) => {
                    const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

                    return (
                        <div key={pokemon.id} className="border p-4 rounded shadow">
                            <img
                                src={pokemon.sprites.front_default || "/placeholder.png"}
                                alt={pokemon.name}
                                className="mx-auto"
                            />
                            <h2 className="text-xl font-semibold text-center capitalize">
                                {pokemon.name}
                            </h2>
                            <div className="flex justify-center flex-wrap gap-2 mt-2">
                                {pokemon.types.map((t) => (
                                    <span
                                        key={t.type.name}
                                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${typeColors[t.type.name] || "bg-gray-500"}`}
                                    >
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <Link
                                    href={`/pokemon/${pokemon.name}`}
                                    className="block text-center bg-black text-white py-1 rounded hover:bg-rose-600"
                                >
                                    See details
                                </Link>
                                <button
                                    onClick={() =>
                                        isFavorite
                                            ? removeFavorite(pokemon.id)
                                            : addFavorite(pokemon)
                                    }
                                    className={`py-1 rounded text-white ${isFavorite ? "bg-rose-700 hover:bg-black" : "bg-rose-500 hover:bg-rose-700"
                                        }`}
                                >
                                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Paginación */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!data.previous}
                    className="bg-rose-500 px-4 py-2 rounded text-white disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!data.next}
                    className="bg-rose-500 px-4 py-2 rounded text-white disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
