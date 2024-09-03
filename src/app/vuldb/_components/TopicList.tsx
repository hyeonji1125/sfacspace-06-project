import TopicListMock from "./_data/topicListMock";

export default function TopicList() {
  return (
    <aside className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">실시간 Topic</h1>
      <p className="text-lg font-medium text-text-gray-default">
        03.08 12:00시 기준
      </p>
      <div className="w-[346px] rounded-lg border border-line-default bg-white p-5 dark:bg-custom-light-bg dark:bg-opacity-5">
        <ul className="text-lg">
          {TopicListMock.map((item) => (
            <li
              key={item.id}
              className="flex items-center border-b border-line-gray-10 py-4 font-medium text-custom-light-text dark:text-white"
            >
              <span className="mr-2">{item.id}.</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
