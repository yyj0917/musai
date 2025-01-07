export default function ArticleSkeleton() {
  return (
    <article className="relative min-w-80 h-full bg-grey750 rounded-sm flex flex-col justify-end p-4">
      {/* <div className="absolute top-0 left-0 w-2 h-full opacity-5 bg-gradient-to-r from-grey250 via-grey350 to-gray-200 animate-loading"></div> */}
      <div className="h-6 w-1/2 bg-grey250 mb-2 rounded "></div>
      <div className="h-4 w-1/4 bg-grey250 rounded"></div>
    </article>
  );
}
