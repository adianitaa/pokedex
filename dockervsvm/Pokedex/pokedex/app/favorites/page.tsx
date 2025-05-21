"use client";

import { useFavoritesStore } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { typeColors } from "@/lib/pokemonTypeColors";

export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavoritesStore();

    if (favorites.length === 0) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Favorites</h1>
                <p>Does not exist pokemon in favorites</p>
                <Link href="/" className="text-blue-600 underline mt-4 block">Back to pokédex</Link>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Favorites Pokémon</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map((pokemon) => (
                    <div key={pokemon.id} className="border p-4 rounded shadow">
                        <Image
                            src={pokemon.sprites.front_default || "/placeholder.png"}
                            alt={pokemon.name}
                            width={96}
                            height={96}
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
                        <div className="flex flex-col items-center mt-2 gap-1">
                            <Link
                                href={`/pokemon/${pokemon.name}`}
                                className="block bg-black text-white py-1 px-2 rounded hover:bg-rose-600 w-full text-center"
                            >
                                See details
                            </Link>
                            <button
                                onClick={() => removeFavorite(pokemon.id)}
                                className="w-full bg-rose-700 hover:bg-yellow-700 text-white py-1 rounded"
                            >
                                Remove from favorites
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
