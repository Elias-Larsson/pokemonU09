type BattlelogProps = {
  attacklogs: string[];
};

export const Battlelog = ({ attacklogs }: BattlelogProps) => {
  const battlelogScrollClass = `
    max-h-100 overflow-y-auto
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-primary-dark
    [&::-webkit-scrollbar-thumb]:bg-gray-100
    dark:[&::-webkit-scrollbar-track]:bg-primary-dark
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700
  `
  return (
    <div className="text-white flex flex-col ">
      <h1 className="text-3xl text-center">--- Battle log ---</h1>
      <ul className={`flex flex-col h-36 w-96 overflow-y-scroll ${battlelogScrollClass} battlog`}>
        <li>
          The battle begins...
        </li>
        {attacklogs.map((log: string, idx: number) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
};