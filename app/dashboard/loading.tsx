export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <div className="h-16 bg-[#F5EDD8] border-b border-[#E5D9BF]" />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-44 skeleton rounded-lg mb-2" />
            <div className="h-4 w-24 skeleton rounded" />
          </div>
          <div className="h-10 w-36 skeleton rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#E5D9BF]">
              <div className="h-5 w-3/4 skeleton rounded mb-2" />
              <div className="h-4 w-1/2 skeleton rounded mb-4" />
              <div className="h-8 w-full skeleton rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
