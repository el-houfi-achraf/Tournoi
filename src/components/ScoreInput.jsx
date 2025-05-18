import { useState } from "react";

const ScoreInput = ({ score1, score2, completed, onChange }) => {
  const [localScore1, setLocalScore1] = useState(score1 !== null ? score1 : "");
  const [localScore2, setLocalScore2] = useState(score2 !== null ? score2 : "");
  const [isEditing, setIsEditing] = useState(!completed);

  const handleScore1Change = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setLocalScore1(value);
    }
  };

  const handleScore2Change = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setLocalScore2(value);
    }
  };

  const handleSave = () => {
    if (localScore1 === "" || localScore2 === "") {
      return;
    }

    onChange(Number(localScore1), Number(localScore2));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <>
          <input
            type="text"
            value={localScore1}
            onChange={handleScore1Change}
            className="w-10 h-10 border border-gray-300 rounded-md text-center"
            placeholder="0"
          />
          <span className="mx-2 text-gray-400">-</span>
          <input
            type="text"
            value={localScore2}
            onChange={handleScore2Change}
            className="w-10 h-10 border border-gray-300 rounded-md text-center"
            placeholder="0"
          />
          <button
            onClick={handleSave}
            className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600 transition"
          >
            Sauvegarder
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md font-bold">
              {score1}
            </span>
            <span className="mx-2 text-gray-400">-</span>
            <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md font-bold">
              {score2}
            </span>
            <button
              onClick={handleEdit}
              className="ml-2 p-1 text-gray-500 hover:text-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ScoreInput;
