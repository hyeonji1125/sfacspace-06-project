export default function WaveCircle() {
  const items = Array.from({ length: 20 }, (_, index) => index);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {items.map((item) => {
        return (
          <div
            key={`circle-${item}`}
            className="animate-circleWave absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-[50%] border border-primary-purple-50 dark:border-opacity-10"
            style={{
              animationDelay: `${item * -0.8}s`,
            }}
          />
        );
      })}
    </div>
  );
}
