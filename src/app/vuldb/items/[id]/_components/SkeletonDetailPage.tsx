export default function SkeletonDetailPage() {
  return (
    <main className="h-auto max-w-[1920px] px-6 pt-9">
      <div className="mx-auto flex w-full max-w-[1313px] flex-col gap-[60px]">
        <div>
          <header className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div className="h-[40px] w-[300px] rounded bg-gray-200"></div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-9 text-xl font-normal text-text-gray-default">
                <div className="h-[20px] w-[200px] rounded bg-gray-200"></div>
                <div className="h-[20px] w-[150px] rounded bg-gray-200"></div>
                <div className="h-[20px] w-[100px] rounded bg-gray-200"></div>
                <div className="h-[20px] w-[100px] rounded bg-gray-200"></div>
              </div>
              <div className="flex space-x-3">
                <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
                <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
              </div>
            </div>
          </header>
        </div>
        <div>
          <div className="m-2 h-[20px] w-[100px] rounded bg-gray-200"></div>
          <div className="m-2 h-[20px] w-[300px] rounded bg-gray-200"></div>
        </div>
      </div>
    </main>
  );
}
