import { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'

/**
 * React hook for fetching data from Sanity CMS.
 * Uses useCdn: true for cached, zero-latency reads.
 *
 * @param {string} query - GROQ query string
 * @param {Object} params - Query parameters (e.g., { slug: 'neuroticker' })
 * @param {*} fallback - Default value while loading (defaults to [])
 * @returns {{ data: *, loading: boolean, error: Error|null }}
 */
export function useSanityData(query, params = {}, fallback = []) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    client
      .fetch(query, params)
      .then((result) => {
        if (!cancelled) setData(result ?? fallback)
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err)
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}
