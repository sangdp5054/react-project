import React from 'react';

const UiFavorite = ({ favorites, favoriteName, onFavoriteNameChange, saveFavorite, loadFavorite, reset }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Favorite Name"
                value={favoriteName}
                onChange={onFavoriteNameChange}
            />
            <button onClick={saveFavorite}>Save Favorite</button>
            <select onChange={(e) => loadFavorite(JSON.parse(e.target.value))}>
                <option value="">Load Favorite</option>
                {favorites.map((favorite, index) => (
                    <option key={index} value={JSON.stringify(favorite)}>
                        {favorite.name}
                    </option>
                ))}
            </select>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default UiFavorite;
