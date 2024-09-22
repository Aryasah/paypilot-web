/**
 * Author: Shrilakshmi Upadhya
 * Date: 14th September 2024
 * 
 * Description: This is just the Sample code for showing how to use the redux store.
 */



import { useSelector } from 'react-redux';

const BillGenerator = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userId = useSelector((state) => state.auth.userId);

    return (
        <div>
            {isLoggedIn ? (
                <p>Generating bill for user: {userId}</p>
            ) : (
                <p>Please log in to generate your bill.</p>
            )}
        </div>
    );
};
