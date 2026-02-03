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
    <div style={{ padding: 20 }}>
      <h1>🔥 Best Deals</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {deals.length === 0 ? (
          <p>No deals baby karo na available</p>
        ) : (
          deals.map(deal => (
            <div
              key={deal.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 15,
              }}
            >
              <img
                src={deal.image}
                alt={deal.title}
                style={{ width: "100%", borderRadius: 8 }}
              />
              <h3>{deal.title}</h3>
              <p>{deal.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}