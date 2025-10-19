"use client";
import { useState } from "react";

export default function Home() {
  const [hero, setHero] = useState<any>(null);
  const [build, setBuild] = useState<any>(null);
  const [loadingHero, setLoadingHero] = useState(false);
  const [loadingBuild, setLoadingBuild] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const randomPlaceholder = [
    "Rolling the dice...",
    "Consulting the ancients...",
    "Choosing your fate...",
    "Summoning a hero...",
    "Balancing the meta...",
  ];

  const randomLoadingText = () =>
    randomPlaceholder[Math.floor(Math.random() * randomPlaceholder.length)];

  const fetchChallenge = async () => {
    setHero(null);
    setBuild(null);
    setError(null);
    setLoadingHero(true);
    setLoadingBuild(false);

    try {
      // Step 1: Fetch Heroes
      const heroRes = await fetch(
        "https://assets.deadlock-api.com/v2/heroes?language=english&only_active=true"
      );
      const heroData = await heroRes.json();
      const randomHero = heroData[Math.floor(Math.random() * heroData.length)];
      setHero(randomHero);
      setLoadingHero(false);
      setLoadingBuild(true);

      // Step 2: Fetch Builds
      const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
      // const buildRes = await fetch(
      //   `https://api.deadlock-api.com/v1/builds?min_published_unix_timestamp=${oneWeekAgo}&only_latest=true&hero_id=${randomHero.id}`
      // );

      // Take only builds from Lordjaponas
      const buildRes = await fetch(
        `https://api.deadlock-api.com/v1/builds?author_id=76561198039863379&only_latest=true&hero_id=${randomHero.id}`
      );
      const buildData = await buildRes.json();

      if (!buildData.length) throw new Error("No builds found for this hero.");

      const randomBuild =
        buildData[Math.floor(Math.random() * buildData.length)].hero_build;

      setBuild(randomBuild);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoadingHero(false);
      setLoadingBuild(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        Deadlock Challenge
      </h1>

      <button
        onClick={fetchChallenge}
        className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
      >
        Give me a challenge
      </button>

      <div className="w-full max-w-2xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hero Section */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md border border-red-500/40">
          <h2 className="text-2xl font-bold mb-3 text-red-400">Hero</h2>
          {loadingHero && (
            <p className="italic animate-pulse">{randomLoadingText()}</p>
          )}
          {hero && (
            <div>
              <p className="text-xl font-semibold text-center">{hero.name}</p>
              <img
                src={hero.images.icon_hero_card}
                alt={hero.name}
                className="mb-4"
              />
            </div>
          )}
        </div>

        {/* Build Section */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md border border-red-500/40">
          <h2 className="text-2xl font-bold mb-3 text-red-400">Build</h2>
          {loadingBuild && (
            <p className="italic animate-pulse">{randomLoadingText()}</p>
          )}
          {build && (
            <div>
              <p className="text-xl font-semibold">{build.name}</p>
              <p className="text-sm opacity-70 mt-2">
                Build ID: {build.hero_build_id}
              </p>
              <p className="text-xs mt-2 text-gray-400">{build.description}</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-400 mt-6 font-semibold">Error: {error}</p>
      )}

      <footer className="mt-12 text-gray-400 text-sm">
        Created by{" "}
        <a
          href="https://neutronas.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:underline"
        >
          NeuTronas
        </a>{" "}
        | Idea by{" "}
        <a
          href="https://steamcommunity.com/profiles/76561198039863379"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:underline"
        >
          BudgieYellow
        </a>
      </footer>
    </div>
  );
}
