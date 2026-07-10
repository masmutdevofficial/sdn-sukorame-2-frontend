/**
 * Cloudflare deployment entry reference.
 *
 * Wrangler must point directly to the generated Nitro bundle at
 * `.output/server/index.mjs`. Importing that bundle through a wrapper changes
 * Wrangler's bundling semantics and breaks Node compatibility modules.
 * See `wrangler.jsonc` for the executable Worker entry.
 */
export const workerEntry = './.output/server/index.mjs'
