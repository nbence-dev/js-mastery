import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event, { IEvent } from "@/database/event.model";

// Type for route context containing dynamic params
type RouteContext = {
  params: Promise<{ slug: string }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 * @param request - Next.js request object
 * @param context - Route context containing dynamic params
 * @returns Event data or error response
 */
export async function GET(
  request: NextRequest,
  context: RouteContext,
): Promise<
  NextResponse<
    { message: string; event: IEvent } | { error: string; details?: string }
  >
> {
  try {
    // Extract slug from dynamic route params
    const { slug } = await context.params;

    // Validate slug parameter
    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter" },
        { status: 400 },
      );
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          error: "Invalid slug format",
          details:
            "Slug must contain only lowercase letters, numbers, and hyphens",
        },
        { status: 400 },
      );
    }

    // Establish database connection
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug }).lean<IEvent>();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          error: "Event not found",
          details: `No event exists with slug: ${slug}`,
        },
        { status: 404 },
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      { message: "Successfully returned event", event: event },
      { status: 200 },
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error("Error fetching event by slug:", error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    );
    );
  }
}
