"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Ticket from "./Ticket";
import { openDB } from "idb";

const formsteps = [
  { id: 1, title: "Your info", component: Step1 },
  { id: 2, title: "Select plan", component: Step2 },
  { id: 3, title: "Summary", component: Step3 },
];

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  dateTime: string;
  avatarUrl: string;
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTicket, setShowTicket] = useState(false);
  const methods = useForm<FormData>();

  useEffect(() => {
    const loadSavedData = async () => {
      const db = await openDB("conference-ticket-db", 1, {
        upgrade(db) {
          db.createObjectStore("formData");
        },
      });
      const savedData = await db.get("formData", "currentForm");
      if (savedData) {
        methods.reset(savedData);
      }
    };
    loadSavedData();
  }, [methods, methods.reset]);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, formsteps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const CurrentStepComponent = formsteps.find(
    (steps) => steps.id === currentStep
  )?.component;
  const onSubmit = async (data: FormData) => {
    const db = await openDB("conference-ticket-db", 1);
    await db.put("formData", data, "currentForm");
    setShowTicket(true);
  };

  return (
    <div className="min-h-screen bg-magnolia flex flex-col md:items-center md:justify-center p-0 md:p-4">
      <div className="relative md:w-[940px] md:h-[600px] md:p-4 md:bg-white md:rounded-2xl md:shadow-lg md:flex">
        <aside className="md:w-[274px] h-[172px] md:h-full bg-[url('/bg-sidebar-mobile.svg')] md:bg-[url('/bg-sidebar-desktop.svg')] bg-cover bg-center md:rounded-lg">
          <div className="pt-8 px-4 md:pt-10 md:px-8 flex md:flex-col justify-center md:justify-start gap-4 md:gap-8">
            {formsteps.map((steps) => (
              <div key={steps.id} className="flex items-center gap-4">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                    currentStep === steps.id
                      ? "bg-blue-200 text-marine-blue border-light-blue"
                      : "border-white text-white"
                  }`}
                >
                  {steps.id}
                </div>{" "}
                <div className="hidden md:block">
                  <p className="text-xs text-pastel-blue">STEP {steps.id}</p>
                  <p className="text-sm font-bold text-white">
                    {steps.title.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="p-4 md:flex-1 md:py-8 md:px-16">
          <div className="bg-white -mt-[72px] md:mt-0 rounded-lg md:rounded-none shadow-lg md:shadow-none p-6 md:p-0">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full max-w-lg"
              >
                {CurrentStepComponent && <CurrentStepComponent />}
                {showTicket && <Ticket />}
              </form>
            </FormProvider>
          </div>
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="bg-[#4b45f0] px-4 py-2 rounded-lg text-[#ffffff]"
              >
                Go Back
              </button>
            )}
            {currentStep < formsteps.length && (
              <button
                onClick={nextStep}
                className="ml-auto bg-[#4b45f0] px-4 py-2 rounded-lg text-[#ffffff] hover:opacity-90"
              >
                Next Step
              </button>
            )}
            {currentStep === formsteps.length && (
              <button
                type="submit"
                className="ml-auto bg-[#4b45f0] px-4 py-2 rounded-lg text-[#ffffff] hover:opacity-90"
              >
                Confirm
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MultiStepForm;
