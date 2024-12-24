export default function LoadingSkeleton() {
  return (
    <>
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 rounded w-full h-12"></div>
        <div className="animate-pulse bg-gray-200 rounded w-3/4 h-12"></div>
        <div className="animate-pulse bg-gray-200 rounded w-1/2 h-12"></div>
      </div>
    </>
  );
}
