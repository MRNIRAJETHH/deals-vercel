import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        "admin@email.com",
        "password123"
      );
      window.location.href = "/admin";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}