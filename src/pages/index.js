import MainLayout from "../components/Layout/MainLayout";
import CalculationForm from "../components";

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Construction Cost Estimator
      </h1>
      <CalculationForm />
    </MainLayout>
  );
}
