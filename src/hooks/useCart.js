export const useCart = ({ addedItems, setAddedItems, user }) => {

    const handleCartClick = async (product) => {
        const isCurrentlyCart = addedItems.some((item) => item.id === product.id);
        const newCartState = !isCurrentlyCart;
        // setIsFavorite(newFavoriteState);

        // Локальное обновление избранного
        setAddedItems((prevItems) =>
            newCartState
                ? [...prevItems, product]
                : prevItems.filter((item) => item.id !== product.id)
        );

        try {
            const response = await fetch(`https://bottry-lucky-bro4.amvera.io/cart/${product.id}`, {
                method: newCartState ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId: user.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to update cart status');
            }

            const data = await response.json();
            console.log('Cart status updated successfully:', data);
        } catch (error) {
            console.error('Error updating cart status:', error);

            // Откат изменений в случае ошибки
            setAddedItems((prevItems) =>
                isCurrentlyCart
                    ? [...prevItems, product]
                    : prevItems.filter((item) => item.id !== product.id)
            );
        }
    };

    return {
        // isFavorite,
        handleCartClick,
    };
};

// export default useCart;