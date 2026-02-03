import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function getServerSideProps() {
  const q = query(collection(db, "deals"), orderBy("createdAt", "desc"));
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
              style={{ width: "100%", borderRadius: 8 }}
            />

            <h3>{deal.title}</h3>
            <p style={{ fontWeight: "bold" }}>₹ {deal.price}</p>

            <a
              href={deal.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                background: "#ff4d4f",
                color: "#fff",
                padding: 10,
                borderRadius: 6,
                textDecoration: "none"
              }}
            >
              Get Deal
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
