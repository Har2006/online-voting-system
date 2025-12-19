export default function Layout({ title, children }) {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <header style={{ marginBottom: "24px" }}>
        <h2>{title}</h2>
        <hr />
      </header>
      <main>{children}</main>
    </div>
  );
}
