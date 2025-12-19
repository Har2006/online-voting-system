import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout title="Dashboard">
      <p>Dashboard content will go here.</p>
      <button onClick={() => navigate("/")}>Logout</button>
    </Layout>
  );
}
