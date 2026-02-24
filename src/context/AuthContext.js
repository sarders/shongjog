import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { collection, addDoc, doc, setDoc, serverTimestamp, query, where, getDocs, updateDoc, deleteField } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Funzione per effettuare il login con Google
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Salva l'accesso su Firestore nella cronologia
            await addDoc(collection(db, 'loginHistory'), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                timestamp: serverTimestamp(),
            });

            // Aggiorna/crea il documento dell'utente nella collezione globale 'users' (per poterlo cercare nel tool Spese)
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                lastLogin: serverTimestamp(),
            }, { merge: true });

            // AUTO-SYNC: Controlla se ci sono conti "In Attesa" per questa email
            try {
                const accountsRef = collection(db, 'sharedAccounts');
                const q = query(accountsRef, where('pendingEmail', '==', user.email.toLowerCase()));
                const snapshot = await getDocs(q);

                const updatePromises = snapshot.docs.map(async (accountDoc) => {
                    const data = accountDoc.data();

                    // Prepara i nuovi dettagli membri, sostituendo quello fittizio con il vero UID
                    const newMemberDetails = { ...data.memberDetails };
                    newMemberDetails[user.uid] = {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL || null,
                        isPending: false
                    };

                    // Rimuovi la voce fittizia
                    delete newMemberDetails[`pending_${user.email.toLowerCase()}`];

                    // Aggiorna il documento
                    return updateDoc(doc(db, 'sharedAccounts', accountDoc.id), {
                        members: [...data.members, user.uid],
                        memberDetails: newMemberDetails,
                        pendingEmail: deleteField() // Rimuove il campo pending
                    });
                });

                if (updatePromises.length > 0) {
                    await Promise.all(updatePromises);
                    console.log(`Risolti ${updatePromises.length} conti in attesa per ${user.email}`);
                }
            } catch (syncError) {
                console.error("Errore durante la sincronizzazione dei conti in attesa:", syncError);
            }

            return user;
        } catch (error) {
            console.error('Errore durante il login con Google:', error);
            throw error;
        }
    };

    // Funzione per effettuare il logout
    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
