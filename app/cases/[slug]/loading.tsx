export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5EDD8] flex flex-col">
      <div className="h-16 bg-[#F5EDD8] border-b border-[#E5D9BF]" />
      <div className="min-h-[320px] bg-[#F5EDD8] border-b border-[#E5D9BF] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="h-4 w-24 skeleton rounded mb-6" />
          <div className="h-6 w-32 skeleton rounded-full mb-4" />
          <div className="h-12 w-3/4 skeleton rounded-xl mb-2" />
          <div className="h-12 w-1/2 skeleton rounded-xl" />
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-14 w-full space-y-12">
        {[1, 2].map((i) => (
          <div key={i}>
            <div className="h-3 w-20 skeleton rounded mb-3" />
            <div className="h-6 w-full skeleton rounded mb-2" />
            <div className="h-6 w-4/5 skeleton rounded" />
          </div>
        ))}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#E5D9BF]">
              <div className="h-10 w-10 skeleton rounded-xl mx-auto mb-3" />
              <div className="h-8 w-full skeleton rounded mb-1" />
              <div className="h-3 w-full skeleton rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
