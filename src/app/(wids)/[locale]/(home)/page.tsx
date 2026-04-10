import { cacheTag } from "next/cache";
import { setRequestLocale } from "next-intl/server";
import { getHomePageData } from "@/features/landing/queries/get-home-page-data";
import { LANDING_TAG } from "@/shared/constants/cache-tags";
import type { Locale } from "@/shared/lib/next-intl/types";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  "use cache";

  const { locale } = await params;

  setRequestLocale(locale);
  cacheTag(LANDING_TAG);

  const data = await getHomePageData(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to Women in Data Science!
        </h1>
        <p className="text-lg text-gray-700">
          Empowering women and showcasing innovations in data science across the
          world.
        </p>
      </section>

      {data && (
        <>
          {/* Edition Info */}
          <section className="rounded-lg bg-gray-100 px-6 py-4 shadow">
            <h2 className="mb-2 text-2xl font-semibold">
              {data.edition?.title} ({data.edition?.year})
            </h2>
            <p className="text-gray-600">
              Discover this year&apos;s edition, its events, ambassadors, and
              sponsors.
            </p>
          </section>

          {/* Events */}
          <section>
            <h3 className="mb-2 text-xl font-bold">Upcoming Events</h3>
            {data.events && data.events.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {data.events.map((event) => (
                  <li
                    key={event.id}
                    className="flex flex-col items-start rounded-lg bg-white p-4 shadow"
                  >
                    <div className="mb-2 text-sm font-semibold text-gray-500 uppercase">
                      {event.type}
                    </div>
                    <div className="mb-1 text-lg font-bold">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "TBA"}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No upcoming events listed yet.</p>
            )}
          </section>

          {/* Ambassadors */}
          <section>
            <h3 className="mb-2 text-xl font-bold">Ambassadors</h3>
            {data.ambassadors && data.ambassadors.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {data.ambassadors.map((ambassador) => (
                  <li
                    key={ambassador.id}
                    className="flex items-center rounded bg-gray-50 px-3 py-1 text-gray-800 shadow"
                  >
                    {/* Add avatar/icon if available */}
                    <span>
                      {ambassador.name ||
                        ambassador.title ||
                        `Ambassador #${ambassador.id}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                Ambassador information coming soon.
              </p>
            )}
          </section>

          {/* Sponsors */}
          <section>
            <h3 className="mb-2 text-xl font-bold">Sponsors</h3>
            {data.sponsors && data.sponsors.length > 0 ? (
              <ul className="mt-3 flex flex-wrap items-center gap-4">
                {data.sponsors.map((sponsor) => (
                  <li
                    key={sponsor.id}
                    className="flex items-center justify-center rounded-lg bg-white px-4 py-2 shadow"
                  >
                    {/* Ideally display sponsor logo if available */}
                    <span className="font-semibold">
                      {sponsor.name || `Sponsor #${sponsor.id}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Sponsor information coming soon.</p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
