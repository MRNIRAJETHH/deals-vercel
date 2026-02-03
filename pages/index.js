import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export async function getServerSideProps() {
  const q = query(
    collection(db, "deals"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  const deals = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: { deals },
  };
}

export default function Home({ deals }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>🔥 Best Deals</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 20,
        marginTop: 20
      }}>
        {deals.map(deal => (
          <div key={deal.id} style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15
          }}>
            <img
              src={deal.image}
              alt={deal.title}
              style={{ width: "100%", borderRadius: 10 }}
            />

            <h3>{deal.title}</h3>
            <p>₹{deal.price}</p>

            <a href={deal.link} target="_blank">
              <button style={{
                width: "100%",
                padding: 10,
                background: "black",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer"
              }}>
                View Deal
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
