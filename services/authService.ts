import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { auth } from "../firebase";

export const register = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const logout = async () => {
    return await signOut(auth);
}

// reset password while logout
export const sendResetPassword = async (email: string) => {
    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent. Check your inbox!");
    } catch (error) {
        console.error(error);
        alert(error);
    }
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        alert("User not logged in");
        return;
    }

    try {
        // Create credential with current password
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);

        // Re-authenticate
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        alert("Password updated successfully!");
    } catch (error: any) {
        console.error(error);
        alert(`Error changing password: ${error.message || error}`);
    }
};