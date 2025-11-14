export const SkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
      <div className="h-4 bg-muted rounded w-4/6" />
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 border border-border rounded-lg space-y-4 animate-pulse">
      <div className="h-6 bg-muted rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-muted rounded w-16" />
        <div className="h-6 bg-muted rounded w-20" />
        <div className="h-6 bg-muted rounded w-16" />
      </div>
    </div>
  );
};
