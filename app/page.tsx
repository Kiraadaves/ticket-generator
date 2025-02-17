import MultiStepForm from "@/components/MultiStepForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="md:text-4xl text-2xl font-bold mb-8 text-center text-[#4b45f0]">
        Conference Ticket Generator
      </h1>
      <MultiStepForm />
    </main>
  );
}
