type TToggleProps = {} & React.ComponentPropsWithoutRef<"input">;

export default function EmailToggle({ ...rest }: TToggleProps) {
  return (
    <label className="flex w-full cursor-default items-center justify-between">
      <span className="text-2xl font-normal">
        이메일로 알림 받기{" "}
        <span className="text-grayscale-50">(준비중인 기능입니다)</span>
      </span>
      <input
        role="switch"
        type="checkbox"
        disabled
        className="relative h-7 w-12 cursor-pointer appearance-none rounded-full border-2 border-line-dark bg-primary-purple-50 before:absolute before:left-0 before:h-6 before:w-6 before:scale-[0.6] before:rounded-full before:bg-[#797472] before:transition-all before:content-[''] checked:border-primary-purple-500 checked:bg-primary-purple-500 checked:before:left-5 checked:before:scale-[0.8] checked:before:bg-white hover:before:bg-text-gray-dark hover:before:shadow-[0_0_0_15px_rgba(29,27,32,0.08)] hover:checked:before:bg-primary-purple-50 hover:checked:before:shadow-[0_0_0_8px_rgba(103,80,164,0.08)] focus:before:shadow-[0_0_0_15px_rgba(201,168,255,0.50)] focus:checked:before:shadow-[0_0_0_8px_rgba(166,111,255,0.12)] active:before:scale-[0.9] active:before:shadow-[0_0_0_6px_rgba(201,168,255,0.50)] active:checked:before:scale-[0.9] active:checked:before:shadow-[0_0_0_6px_rgba(166,111,255,0.12)] disabled:cursor-default disabled:border-primary-purple-200 disabled:border-opacity-50 disabled:bg-bg-purple-light disabled:before:scale-[0.6] disabled:before:bg-[#1d1b20] disabled:before:bg-opacity-[0.38] disabled:before:shadow-none disabled:checked:border-primary-purple-200 disabled:checked:border-opacity-0 disabled:checked:bg-primary-purple-200 disabled:checked:bg-opacity-50 disabled:checked:before:scale-[0.8] disabled:checked:before:bg-bg-purple-light disabled:checked:before:bg-opacity-100 disabled:checked:before:shadow-none dark:bg-opacity-10 dark:checked:bg-opacity-100 dark:disabled:bg-opacity-20"
        {...rest}
      />
    </label>
  );
}
