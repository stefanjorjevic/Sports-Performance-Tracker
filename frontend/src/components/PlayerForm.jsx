import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  age: "",
  position: "Forward",
  attendancePercentage: "",
  fitnessScore: "",
  status: "Active"
};

function PlayerForm({ playerToEdit, onSave, onCancelEdit, isSaving }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (playerToEdit) {
      setFormData({
        ...playerToEdit,
        age: String(playerToEdit.age),
        attendancePercentage: String(playerToEdit.attendancePercentage),
        fitnessScore: String(playerToEdit.fitnessScore)
      });
    } else {
      setFormData(emptyForm);
    }
  }, [playerToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const wasSaved = await onSave({
      id: playerToEdit?.id,
      name: formData.name.trim(),
      age: Number(formData.age),
      position: formData.position,
      attendancePercentage: Number(formData.attendancePercentage),
      fitnessScore: Number(formData.fitnessScore),
      status: formData.status
    });

    if (wasSaved && !playerToEdit) {
      setFormData(emptyForm);
    }
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Player details</p>
          <h2>{playerToEdit ? "Edit player" : "Add player"}</h2>
        </div>
      </div>

      <form className="player-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength="2"
            placeholder="e.g. Milan Nikolic"
            required
          />
        </label>

        <label>
          Age
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            min="5"
            max="60"
            required
          />
        </label>

        <label>
          Position
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
          >
            <option>Forward</option>
            <option>Midfielder</option>
            <option>Defender</option>
            <option>Goalkeeper</option>
          </select>
        </label>

        <label>
          Attendance percentage
          <input
            name="attendancePercentage"
            type="number"
            value={formData.attendancePercentage}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </label>

        <label>
          Fitness score
          <input
            name="fitnessScore"
            type="number"
            value={formData.fitnessScore}
            onChange={handleChange}
            min="1"
            max="10"
            step="0.1"
            required
          />
        </label>

        <label>
          Status
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Injured</option>
            <option>Inactive</option>
          </select>
        </label>

        <div className="form-actions">
          <button
            className="button primary-button"
            type="submit"
            disabled={isSaving}
          >
            {isSaving
              ? "Saving..."
              : playerToEdit
                ? "Save changes"
                : "Add player"}
          </button>

          {playerToEdit && (
            <button
              className="button secondary-button"
              type="button"
              onClick={onCancelEdit}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default PlayerForm;
