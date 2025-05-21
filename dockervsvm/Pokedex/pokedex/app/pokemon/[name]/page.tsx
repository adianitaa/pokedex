import { getPokemonDetails } from "@/lib/getPokemonDetails";
import { FullPokemon } from "@/lib/zodSchemas";
import Image from "next/image";
import { typeColors } from "@/lib/pokemonTypeColors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightScale, faRuler } from "@fortawesome/free-solid-svg-icons";

interface Props {
    params: { name: string };
}

export default async function PokemonPage({ params }: Props) {
    const pokemon: FullPokemon = await getPokemonDetails(
        `https://pokeapi.co/api/v2/pokemon/${params.name}`
    );

    return (
        <div className="flex flex-col xl:flex-row container-xl">
            <div className="info md:w-1/2 center">
                <Image
                    src={pokemon.sprites.other?.["official-artwork"].front_default ?? "/placeholder.png"}
                    alt={pokemon.name}
                    width={500}
                    height={500}
                    className="mx-auto"
                />
                <h1 className="text-3xl font-bold capitalize text-center mt-4">
                    {pokemon.name}
                </h1>
                <div className="flex justify-center flex-wrap gap-2 mt-4">
                    {pokemon.types.map((typeObj) => (
                        <span
                            key={typeObj.type.name}
                            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${typeColors[typeObj.type.name] || "bg-gray-500"}`}
                        >
                            {typeObj.type.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="information md:w-1/2">
                <p><strong>ID:</strong> {pokemon.id}</p>
                <p><strong><FontAwesomeIcon icon={faRuler} className="mr-2" />Height:</strong>{" "} {pokemon.height} m</p>
                <p><strong><FontAwesomeIcon icon={faWeightScale} className="mr-2" />Weight:</strong>{" "} {pokemon.weight} kg</p>
                <p>
                    <strong>Skills:</strong>{" "}
                    <ul className="list-disc list-inside">
                        {pokemon.abilities.map((a, index) => (
                            <li key={index}>{a.ability.name}</li>
                        ))}
                    </ul>
                </p>
                <div>
                    <strong>Stadistics:</strong>
                    <ul className="mt-2 space-y-3">
                        {pokemon.stats.map((s, index) => {
                            const shortLabels: Record<string, string> = {
                                hp: "HP",
                                attack: "ATK",
                                defense: "DEF",
                                "special-attack": "SATK",
                                "special-defense": "SDEF",
                                speed: "SPD",
                            };

                            const statLabel = shortLabels[s.stat.name] || s.stat.name.toUpperCase();
                            const statValue = s.base_stat;
                            const barWidth = Math.min(statValue, 300);
                            const typeName = pokemon.types[0]?.type.name || "normal";
                            const barColor = typeColors[typeName] || "#FFA500";

                            return (
                                <li key={index}>
                                    <div className="flex justify-between text-sm font-semibold text-gray-700">
                                        <span className="w-16">{statLabel}</span>
                                        <span>{statValue.toString().padStart(3, "0")}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full">
                                        <div
                                            className={`h-2.5 rounded-full ${barColor}`}
                                            style={{
                                                width: `${barWidth}%`,
                                            }}
                                        ></div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}