export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <div className="h-16 bg-[#F5EDD8] border-b border-[#E5D9BF]" />
      <div className="bg-white border-b border-[#E5D9BF] py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="h-6 w-28 skeleton rounded-full mb-5 mx-auto" />
          <div className="h-12 w-80 skeleton rounded-xl mb-4 mx-auto" />
          <div className="h-5 w-96 skeleton rounded mx-auto" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E5D9BF] overflow-hidden">
              <div className="h-44 skeleton" />
              <div className="p-6">
                <div className="h-5 w-3/4 skeleton rounded mb-2" />
                <div className="h-4 w-1/2 skeleton rounded mb-4" />
                <div className="h-9 w-full skeleton rounded-xl mb-5" />
                <div className="h-8 w-full skeleton rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
