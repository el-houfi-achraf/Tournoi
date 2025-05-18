import { motion } from "framer-motion";

const RankingTable = ({ teams }) => {
  // Animation variants for staggered items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="overflow-x-auto">
      <motion.table
        variants={container}
        initial="hidden"
        animate="show"
        className="min-w-full divide-y divide-gray-200"
      >
        <thead>
          <tr className="bg-gray-50">
            <th
              scope="col"
              className="pl-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Position
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Équipe
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              J
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              V
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              N
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              D
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              BP
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              BC
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Diff
            </th>
            <th
              scope="col"
              className="pr-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Pts
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {teams.map((team, index) => (
            <motion.tr
              key={team.id}
              variants={item}
              className={index < 3 ? "bg-blue-50" : ""}
            >
              <td className="pl-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <span
                    className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${
                      index === 0
                        ? "bg-yellow-400 text-yellow-800"
                        : index === 1
                        ? "bg-gray-300 text-gray-700"
                        : index === 2
                        ? "bg-amber-600 text-amber-100"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                  >
                    {index + 1}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${team.avatar} mr-3`}
                  >
                    {team.name[0].toUpperCase()}
                  </div>
                  <span className="font-medium">{team.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                {team.played}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-green-600">
                {team.wins}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-gray-500">
                {team.draws}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-red-500">
                {team.losses}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                {team.goalsFor}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                {team.goalsAgainst}
              </td>
              <td
                className={`px-4 py-3 whitespace-nowrap text-center font-medium ${
                  team.goalDifference > 0
                    ? "text-green-600"
                    : team.goalDifference < 0
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {team.goalDifference > 0
                  ? `+${team.goalDifference}`
                  : team.goalDifference}
              </td>
              <td className="pr-4 py-3 whitespace-nowrap text-center font-bold">
                {team.points}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default RankingTable;
