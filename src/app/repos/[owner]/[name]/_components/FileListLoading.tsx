export default function FileListLoading() {
  return (
    <div className="flex items-center gap-[10px] bg-bg-gray-light px-6 py-2 dark:bg-bg-gray-light/10">
      <div className="flex items-center space-x-1">
        <span className="h-[2px] w-[2px] animate-bounce rounded-full bg-text-gray-default [animation-delay:-0.3s]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-text-gray-default [animation-delay:-0.15s]" />
        <span className="h-[6px] w-[6px] animate-bounce rounded-full bg-text-gray-default" />
      </div>
      <p className="text-text-gray-default">loading files</p>
    </div>
  );
}
