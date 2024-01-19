// AdoptionForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

const AdoptionForm = ({ dogs, adopters, onAdoptionSubmit }) => {
    const [selectedDog, setSelectedDog] = useState('');
    const [selectedAdopter, setSelectedAdopter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDog && selectedAdopter) {
            onAdoptionSubmit(selectedDog, selectedAdopter);
            // Clear selected values after submission
            setSelectedDog('');
            setSelectedAdopter('');
        } else {
            console.error('Debe seleccionar un perro y un adoptante.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={selectedDog} onChange={(e) => setSelectedDog(e.target.value)}>
                <option value="">Selecciona un perro 🐶</option>
                {dogs.map((dog) => (
                    <option key={dog.id} value={dog.id}>
                        🐶 {dog.name}
                    </option>
                ))}
            </select>
            <select value={selectedAdopter} onChange={(e) => setSelectedAdopter(e.target.value)}>
                <option value="">Selecciona un adoptante 👤</option>
                {adopters.map((adopter) => (
                    <option key={adopter.id} value={adopter.id}>
                        👤 {adopter.name}
                    </option>
                ))}
            </select>
            <button type="submit">Adoptar</button>
        </form>
    );
};

AdoptionForm.propTypes = {
    dogs: PropTypes.array.isRequired,
    adopters: PropTypes.array.isRequired,
    onAdoptionSubmit: PropTypes.func.isRequired,
};

export default AdoptionForm;