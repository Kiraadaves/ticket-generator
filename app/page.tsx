import MultiStepForm from "@/components/MultiStepForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Conference Ticket Generator</h1>
      <MultiStepForm />
    </main>
  );
}
