export const useFavorite = ({ favoriteItems, setFavoriteItems, user }) => {

    const handleFavoriteClick = async (product) => {
        const isCurrentlyFavorite = favoriteItems.some(item => item.id === product.id)
        const newFavoriteState = !isCurrentlyFavorite;

        // setIsFavorite(newFavoriteState);

        // Локальное обновление избранного
        setFavoriteItems((prevItems) =>
            newFavoriteState
                ? [...prevItems, product]
                : prevItems.filter((item) => item.id !== product.id)
        );

        try {
            const response = await fetch(`https://bottry-lucky-bro4.amvera.io/favorites/${product.id}`, {
                method: newFavoriteState ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId: user.id }),
            });

            if (!response.ok) {
                // alert('Failed to update favorite status');
                throw new Error('Failed to update favorite status');
            }

            const data = await response.json();
            // alert('Favorite status updated successfully:', data);
            console.log('Favorite status updated successfully:', data);
        } catch (error) {
            // alert('Error updating favorite status:', error);
            console.error('Error updating favorite status:', error);

            // Откат изменений в случае ошибки
            // setIsFavorite(isCurrentlyFavorite);
            setFavoriteItems((prevItems) =>
                isCurrentlyFavorite
                    ? [...prevItems, product]
                    : prevItems.filter((id) => id !== product.id)
            );
        }
    };

    return {
        // isFavorite,
        handleFavoriteClick,
    };
};

// export default useFavorite;