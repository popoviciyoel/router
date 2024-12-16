import * as React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';

const Leaderboard = () => {
  const [sortBy, setSortBy] = React.useState('rank');

  const dummyData = [
    { rank: 1, name: 'Alice', score: 1500 },
    { rank: 2, name: 'Bob', score: 1400 },
    { rank: 3, name: 'Charlie', score: 1350 },
    { rank: 4, name: 'Diana', score: 1300 },
    { rank: 5, name: 'Eve', score: 1250 },
  ];

  const sortedData = [...dummyData].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'score') return b.score - a.score;
    return 0;
  });

  return (
    <div className="w-full max-w-lg mx-auto border border-gray-200 rounded-md">
      <div className="p-4 border-b bg-gray-100">
        <ToggleGroup
          type="single"
          value={sortBy}
          onValueChange={(value) => value && setSortBy(value)}
          className="flex space-x-2"
        >
          <ToggleGroupItem
            value="rank"
            className={`px-4 py-2 rounded ${
              sortBy === 'rank' ? 'bg-violet-500 text-white' : 'bg-white text-gray-800'
            }`}
          >
            Rank
          </ToggleGroupItem>
          <ToggleGroupItem
            value="name"
            className={`px-4 py-2 rounded ${
              sortBy === 'name' ? 'bg-violet-500 text-white' : 'bg-white text-gray-800'
            }`}
          >
            Name
          </ToggleGroupItem>
          <ToggleGroupItem
            value="score"
            className={`px-4 py-2 rounded ${
              sortBy === 'score' ? 'bg-violet-500 text-white' : 'bg-white text-gray-800'
            }`}
          >
            Score
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-600">Rank</th>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry) => (
            <tr key={entry.rank} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 text-gray-800">{entry.rank}</td>
              <td className="px-4 py-2 text-gray-800">{entry.name}</td>
              <td className="px-4 py-2 text-gray-800">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
