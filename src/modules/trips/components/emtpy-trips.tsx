import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const EmptyTrips = () => {
  return (
    <Empty className="min-h-page">
      <EmptyHeader>
        <EmptyMedia variant="icon">🌴</EmptyMedia>
        <EmptyTitle>No Trips Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created or joined any trips yet. Get started by
          creating your first trip.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="mb-16">
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/create">Create Trip</Link>
          </Button>
          <Button variant="outline" disabled>
            Join Trip
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};
