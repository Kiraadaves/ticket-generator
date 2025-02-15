"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Ticket from "./Ticket";
import { openDB } from "idb";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  dateTime: string;
  avatarUrl: string;
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
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
  }, [methods, methods.reset]); // Added methods.reset to dependencies

  const onSubmit = async (data: FormData) => {
    const db = await openDB("conference-ticket-db", 1);
    await db.put("formData", data, "currentForm");
    setShowTicket(true);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-lg"
      >
        {step === 1 && <Step1 nextStep={nextStep} />}
        {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 prevStep={prevStep} />}
        {showTicket && <Ticket />}
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
