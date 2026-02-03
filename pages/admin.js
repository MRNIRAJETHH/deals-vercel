import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Admin() {
  const addDeal = async () => {
    await addDoc(collection(db, "deals"), {
      title: "Wireless Earbuds",
      link: "https://affiliate-link.com"
    });
    alert("Deal Added");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      <button onClick={addDeal}>Add Deal</button>
    </div>
  );
}
