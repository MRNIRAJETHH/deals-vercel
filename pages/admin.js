import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const addDeal = async () => {
    if (!title  !price  !image || !link) {
      alert("All fields required");
      return;
    }

    await addDoc(collection(db, "deals"), {
      title,
      price,
      image,
      link,
      createdAt: Date.now(),
    });

    alert("Deal Added ✅");
    setTitle("");
    setPrice("");
    setImage("");
    setLink("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>

      <input
        placeholder="Product Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      /><br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      /><br /><br />

      <input
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
      /><br /><br />

      <input
        placeholder="Affiliate Link"
        value={link}
        onChange={e => setLink(e.target.value)}
      /><br /><br />

      <button onClick={addDeal}>Add Deal</button>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}