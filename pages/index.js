import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getServerSideProps() {
  try {
    const snapshot = await getDocs(collection(db, "deals"));

    const deals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { props: { deals } };
  } catch (err) {
    console.error("Firebase SSR error:", err);
    return { props: { deals: [] } };
  }
}

export default function Home({ deals }) {
  return (
    <div style={{ padding: 20, background: "#f1f3f6", minHeight: "100vh" }}>
      <h1 style={{ color: "#2874f0" }}>🔥 Best Deals</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {deals.length === 0 ? (
          <p>No deals available</p>
        ) : (
          deals.map(deal => (
            <div
              key={deal.id}
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 12,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={deal.image}
                alt={deal.title}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />

              <h3 style={{ fontSize: 16, margin: "10px 0" }}>
                {deal.title}
              </h3>

              <p style={{ color: "green", fontWeight: "bold" }}>
                ₹{deal.price}
              </p>

              <a
                href={deal.link}
                target="_blank"
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 10,
                  background: "#fb641b",
                  color: "#fff",
                  padding: 8,
                  borderRadius: 4,
                  textDecoration: "none",
                }}
              >
                View Deal
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}