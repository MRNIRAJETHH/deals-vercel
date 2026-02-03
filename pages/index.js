import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "deals")).then(snap => {
      setDeals(snap.docs.map(d => d.data()));
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 Best Deals</h1>
      {deals.map((d, i) => (
        <div key={i}>
          <h3>{d.title}</h3>
          <a href={d.link}>Grab Deal</a>
        </div>
      ))}
    </div>
  );
}
