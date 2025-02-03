export const removeCartItem = async (itemId) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
            throw new Error('User is not authenticated');
        }

        const response = await fetch(`https://ram.freelogomaker.in/api/cart/${itemId}`, {
            method: 'DELETE', // Use DELETE instead of POST
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Send Bearer Token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove item');
        }

        return { success: true };
    } catch (error) {
        console.error('Error removing cart item:', error);
        return { success: false, error: error.message };
    }
};
