<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router application. Here's a summary of all changes made:

- **`instrumentation-client.ts`** *(new file)* — Client-side PostHog initialization using the Next.js 15.3+ `instrumentation-client.ts` pattern. Initializes PostHog with the EU host, reverse proxy endpoint (`/ingest`), automatic error/exception tracking (`capture_exceptions: true`), and debug mode in development.
- **`next.config.ts`** *(updated)* — Added EU reverse proxy rewrites (`/ingest/static/*` → `eu-assets.i.posthog.com`, `/ingest/*` → `eu.i.posthog.com`) and `skipTrailingSlashRedirect: true` to support PostHog's trailing-slash API requests.
- **`.env.local`** *(new file)* — PostHog API key and EU host stored as `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables (covered by `.gitignore`).
- **`components/ExploreBtn.tsx`** *(updated)* — Converted to a client component; captures `explore_events_clicked` when the "Explore Events" CTA button is clicked — the top of the event discovery funnel.
- **`components/EventCard.tsx`** *(updated)* — Converted to a client component; captures `event_card_clicked` with rich properties (`event_title`, `event_slug`, `event_location`, `event_date`) whenever a user clicks an event card — a key indicator of event interest.
- **`components/Navbar.tsx`** *(updated)* — Converted to a client component; captures `nav_link_clicked` with a `label` property on every navbar link click, enabling navigation pattern analysis.

## Events

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" CTA button on the homepage — top of the event discovery funnel | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view event details — key conversion step indicating event interest (properties: `event_title`, `event_slug`, `event_location`, `event_date`) | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navigation link in the navbar (property: `label` — one of "Home", "Events", "Create Event", "Logo") | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://eu.posthog.com/project/132406/dashboard/542463
- 📈 **Event Discovery Trend** (line chart — Explore Events clicks vs Event card clicks over time): https://eu.posthog.com/project/132406/insights/DYKfJAFz
- 🔻 **Event Discovery Funnel** (conversion from CTA click → event card click): https://eu.posthog.com/project/132406/insights/s9fZux6C
- 🏆 **Most Popular Events** (bar chart — event card clicks broken down by event title): https://eu.posthog.com/project/132406/insights/joEYC6fD
- 🥧 **Navigation Link Distribution** (pie chart — navbar clicks by label): https://eu.posthog.com/project/132406/insights/PQtNtsOh
- 👥 **Daily Active Users Browsing Events** (unique users clicking event cards per day): https://eu.posthog.com/project/132406/insights/fC8dNi7w

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
