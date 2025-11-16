import { Bomb, Lock, RefreshCcw, SearchX } from "lucide-react";
import { ConvexError } from "convex/values";
import { Button } from "./ui/button";
import type { FallbackProps } from "react-error-boundary";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (!(error instanceof ConvexError)) {
    return (
      <Empty className="min-h-page container">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Bomb />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            An unexpected error occurred. Please try again later or reload the
            page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mb-12">
          <Button variant="outline" onClick={() => resetErrorBoundary()}>
            <RefreshCcw /> Retry
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  if (error.data === "Unauthorized") {
    return (
      <Empty className="min-h-page container">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Lock />
          </EmptyMedia>
          <EmptyTitle>Unauthorized</EmptyTitle>
          <EmptyDescription>
            Looks like you're not authorized or have insufficient permissions.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mb-12">
          <Button variant="outline" onClick={() => resetErrorBoundary()}>
            <RefreshCcw /> Retry
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  if (error.data === "NotFound") {
    return (
      <Empty className="min-h-page container">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>
          <EmptyTitle>Not found (404)</EmptyTitle>
          <EmptyDescription>
            Looks like what you're looking for doesn't exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mb-12">
          <Button variant="outline" onClick={() => resetErrorBoundary()}>
            <RefreshCcw /> Retry
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <Empty className="min-h-page container">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Bomb />
        </EmptyMedia>
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>
          An unexpected error occurred. Please try again later or reload the
          page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="mb-12">
        <Button variant="outline" onClick={() => resetErrorBoundary()}>
          <RefreshCcw /> Retry
        </Button>
      </EmptyContent>
    </Empty>
  );
};
