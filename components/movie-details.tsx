import { notFound } from 'next/navigation'
import { getMovie } from '~/lib/db.server'
import { Rating } from './ratings'

export async function MovieDetails({ id }: { id: string }) {
  const movie = await getMovie(id)

  if (movie === null) return notFound()

  const {
    coverUrl = '',
    primaryTitle,
    summary,
    startYear,
    genres,
    runtimeMinutes,
    averageRating,
    numVotes,
  } = movie

  return (
    <div className=" place-items-center grid bg-black">
      <header className="mb-10">
        <h1 className="text-6xl">{primaryTitle}</h1>
        {startYear && (
          <time className="text-right block" dateTime={String(startYear)}>
            ({startYear})
          </time>
        )}
        {averageRating ? (
          <>
            <Rating value={averageRating} />
            <small>({numVotes?.toLocaleString('en-Us')} votes)</small>
          </>
        ) : null}
      </header>
      <article className="grid lg:grid lg:grid-cols-2 max-w-5xl mx-auto gap-5 p-5 ">
        <section className="grid place-items-center">
          {coverUrl?.startsWith('http') && !coverUrl?.endsWith('null') && (
            <picture>
              <source srcSet={coverUrl} type="image/webp" />
              <img
                src={coverUrl}
                alt={`Poster for "${primaryTitle}"`}
                className="rounded-lg "
              />
            </picture>
          )}
        </section>
        <section className="leading-8 ">
          {genres && genres.length > 0 && (
            <ul className="flex gap-2 mb-8">
              {genres?.map((genre) => (
                <li
                  key={id + genre}
                  className="border-2 border-neutral-800 rounded-lg py-1 px-2"
                >
                  {genre}
                </li>
              ))}
            </ul>
          )}
          <p className="max-w-prose mx-auto">{summary}</p>
          <p className="text-right text-neutral-400">
            Duration: {runtimeMinutes} minutes.
          </p>
        </section>
      </article>
    </div>
  )
}