import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const login = async () => {
    await signInWithEmailAndPassword(
      auth,
      "admin@email.com",
      "password123"
    );
    window.location.href = "/admin";
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}
