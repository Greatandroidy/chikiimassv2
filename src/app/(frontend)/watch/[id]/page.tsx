import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import React from 'react';
import Image from 'next/image';
import type { Episode } from '@/payload-types';
import { CollectionArchive } from '@/components/CollectionArchive';

export const dynamic = 'force-static';
export const revalidate = 600;

interface EpisodeResponse {
  docs: Episode[];
}

const Watch = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const payload = await getPayloadHMR({ config: configPromise });
  const episodes: EpisodeResponse = await payload.find({
    collection: 'episodes',
    depth: 1,
    limit: 12,
    overrideAccess: true,
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!episodes || !episodes.docs.length) {
    return <div className="text-center text-gray-500">Episode not found</div>;
  }

  const episode = episodes.docs[0];

  // Extract related movies, series, and posts
  const relatedMovies = episode.relatedMovies || [];
  const relatedPosts = episode.relatedPosts || [];
  const relatedSeries = episode.relatedSeries || [];

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row bg-black">
      {/* Main content */}
      <main className="relative w-full h-screen lg:h-auto flex-grow lg:w-[65%]">
        {/* Background Video */}
        <video
          className="absolute inset-0 object-cover w-full"
          src="https://turin2.nebula.to/ed8dc3f6370e3e9d538d9b6336f86c367282a6b1.mp4?md5=lxOpZJnRonWWyWU9Csdjdg&expires=1727261123"
          autoPlay
          loop
          muted
        />

        {/* Top-right Gradient near Sidebar */}
        <div className="absolute inset-0 lg:bg-gradient-to-l lg:from-black lg:via-transparent lg:to-transparent w-full h-full" />

        {/* Frosted/Blurred effect */}
        <div className="absolute inset-0 backdrop-blur-lg bg-black/10" />

        <div className="relative z-10 p-8 text-white">
          <div className="relative w-full h-0 pb-[56.25%] mb-6 bg-black">
            {episode.url?.length > 0 && episode.url[0]?.videos?.length > 0 && (
              <video
                src={episode.url[0].videos[0].videoLink}
                controls
                className="absolute w-full rounded-lg"
              ></video>
            )}
          </div>
          <h1 className="text-4xl font-bold">{episode.title}</h1>
          <p className="mt-4 text-lg">{episode.descr}</p>
        </div>
      </main>

      {/* Sidebar - Below the video on small/medium screens, beside it on large */}
      <aside className="w-full lg:w-[35%] lg:h-screen bg-black p-4 mt-6 lg:mt-0 flex-shrink-0 pt-4 ">
        <h2 className="text-2xl font-bold text-white mb-6">Related</h2>
        <ul className="mb-4">
          {relatedMovies.map((movie) => (
            <CollectionArchive movies={[movie]} />
          ))}
        </ul>
        <ul className="mb-4">
          {relatedPosts.map((post) => (
            <CollectionArchive posts={[post]} />
          ))}
        </ul>
        <ul>
          {relatedSeries.map((seriesId) => {
            const relatedSeries = episodes.docs.find((ep) => ep.id === seriesId);
            return (
              relatedSeries && (
                <li key={relatedSeries.id} className="mb-2">
                  <a href={`/watch/${relatedSeries.slug}`} className="text-blue-400 hover:underline">
                    {relatedSeries.title}
                  </a>
                </li>
              )
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Watch;
