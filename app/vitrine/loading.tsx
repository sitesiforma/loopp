export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <div className="h-16 bg-[#F5EDD8] border-b border-[#E5D9BF]" />
      <div className="bg-white border-b border-[#E5D9BF] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-36 skeleton rounded-full mb-4" />
          <div className="h-10 w-64 skeleton rounded-xl mb-3" />
          <div className="h-5 w-96 skeleton rounded" />
        </div>
      </div>
      <div className="h-14 border-b border-[#E5D9BF]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="h-4 w-32 skeleton rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E5D9BF] overflow-hidden"
            >
              <div className="h-32 skeleton" />
              <div className="p-5">
                <div className="h-4 w-3/4 skeleton rounded mb-2" />
                <div className="h-3 w-24 skeleton rounded mb-3" />
                <div className="h-3 w-full skeleton rounded mb-1" />
                <div className="h-3 w-4/5 skeleton rounded mb-4" />
                <div className="h-8 w-full skeleton rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
