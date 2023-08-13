import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../../utils/firebase';

const ProtectedRoute = ({ children }) => {
    const router = useRouter ();
    const auth = getAuth (firebaseApp);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
            router.push('/login');
        }
    });

    return () => {
        unsubscribe();
    };
}, [auth, router]);

    return children;
};

export default ProtectedRoute;