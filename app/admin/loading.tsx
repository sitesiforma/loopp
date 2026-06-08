export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex">
      <div className="w-64 bg-white border-r border-[#E5D9BF] h-screen" />
      <div className="flex-1 p-8">
        <div className="h-9 w-48 skeleton rounded-lg mb-2" />
        <div className="h-4 w-32 skeleton rounded mb-7" />
        <div className="bg-white rounded-2xl border border-[#E5D9BF] overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 px-5 py-4 border-b border-[#E5D9BF]/50">
              <div className="h-4 w-28 skeleton rounded" />
              <div className="h-4 w-44 skeleton rounded" />
              <div className="h-4 w-20 skeleton rounded" />
              <div className="h-4 w-24 skeleton rounded" />
              <div className="h-6 w-20 skeleton rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
