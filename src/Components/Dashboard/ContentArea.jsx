import React, { useState } from "react";
import "./dashboard.css";
import { useAuth } from "../../contexts/AuthContexts";

const ContentArea = () => {
  const { currentUser } = useAuth();
  const [workoutSplits, setWorkoutSplits] = useState([
    { splitName: "", exercises: [] },
  ]);

  const handleAddSplit = () => {
    setWorkoutSplits((prevSplits) => [
      ...prevSplits,
      { splitName: "", exercises: [] },
    ]);
  };

  const handleAddExercise = (splitIndex) => {
    // Check if split name is provided
    if (!workoutSplits[splitIndex]?.splitName) {
      alert("Please enter a split name before adding exercises.");
      return;
    }

    setWorkoutSplits((prevSplits) => {
      const updatedSplits = [...prevSplits];
      const currentSplit = updatedSplits[splitIndex] || { exercises: [] };
      currentSplit.exercises.push({
        exerciseName: "",
        weight: "",
        reps: "",
      });
      updatedSplits[splitIndex] = currentSplit;
      return updatedSplits;
    });
  };

  const handleDeleteSplit = (splitIndex) => {
    setWorkoutSplits((prevSplits) => {
      const updatedSplits = [...prevSplits];
      updatedSplits.splice(splitIndex, 1);
      return updatedSplits;
    });
  };

  const handleDeleteExercise = (splitIndex, exerciseIndex) => {
    setWorkoutSplits((prevSplits) => {
      const updatedSplits = [...prevSplits];
      updatedSplits[splitIndex].exercises.splice(exerciseIndex, 1);
      return updatedSplits;
    });
  };

  const handleInputChange = (splitIndex, exerciseIndex, property, value) => {
    setWorkoutSplits((prevSplits) => {
      const updatedSplits = [...prevSplits];
      const currentSplit = updatedSplits[splitIndex] || { exercises: [] };

      if (property === "splitName") {
        // Update split name directly
        currentSplit[property] = value;
      } else {
        // Check if exerciseIndex is out of bounds
        if (!currentSplit.exercises[exerciseIndex]) {
          return updatedSplits;
        }

        // Update exercise property
        currentSplit.exercises[exerciseIndex][property] = value;
      }

      updatedSplits[splitIndex] = currentSplit;
      return updatedSplits;
    });
  };

  return (
    <div className="content-area">
      <h2>Workout Tracker</h2>

      {/* Display Workout Splits and Exercises */}
      {workoutSplits.map((split, splitIndex) => (
        <div key={splitIndex} className="workout-split">
          <div className="split-name">
            <input
              type="text"
              placeholder="Split Name"
              value={split.splitName}
              onChange={(e) =>
                handleInputChange(splitIndex, 0, "splitName", e.target.value)
              }
            />
            <button
              onClick={() => handleDeleteSplit(splitIndex)}
              className="delete-button"
            >
              Delete Split
            </button>
          </div>

          <div className="exercises">
            {split.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="exercise">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.exerciseName}
                  onChange={(e) =>
                    handleInputChange(
                      splitIndex,
                      exerciseIndex,
                      "exerciseName",
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Weight"
                  value={exercise.weight}
                  onChange={(e) =>
                    handleInputChange(
                      splitIndex,
                      exerciseIndex,
                      "weight",
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleInputChange(
                      splitIndex,
                      exerciseIndex,
                      "reps",
                      e.target.value
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleDeleteExercise(splitIndex, exerciseIndex)
                  }
                  className="delete-button"
                >
                  Delete Exercise
                </button>
              </div>
            ))}
          </div>

          {/* Add Exercise Button */}
          <button
            onClick={() => handleAddExercise(splitIndex)}
            className="add-button"
          >
            Add Exercise
          </button>
        </div>
      ))}

      {/* Add Split Button */}
      <button onClick={handleAddSplit} className="add-button">
        Add Split
      </button>
    </div>
  );
};

export default ContentArea;
