export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <div className="h-16 bg-[#F5EDD8] border-b border-[#E5D9BF]" />
      <div className="bg-white border-b border-[#E5D9BF] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-6 w-40 skeleton rounded-full mb-4" />
          <div className="h-10 w-80 skeleton rounded-xl mb-2" />
          <div className="h-5 w-64 skeleton rounded" />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-7 border border-[#E5D9BF]">
            <div className="h-7 w-48 skeleton rounded mb-6" />
            <div className="h-4 w-32 skeleton rounded mb-3" />
            <div className="flex gap-2 flex-wrap mb-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-20 skeleton rounded-lg" />
              ))}
            </div>
            <div className="h-4 w-40 skeleton rounded mb-3" />
            <div className="h-2 w-full skeleton rounded mb-6" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between py-3 border-b border-[#E5D9BF]">
                <div className="h-4 w-40 skeleton rounded" />
                <div className="h-6 w-11 skeleton rounded-full" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-7 border-2 border-[#E5D9BF]">
            <div className="h-7 w-48 skeleton rounded mb-6" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#F5EDD8] mb-4">
                <div className="h-10 w-10 skeleton rounded-xl shrink-0" />
                <div className="flex-1 h-4 skeleton rounded" />
                <div className="h-8 w-20 skeleton rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
