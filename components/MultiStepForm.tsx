"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Ticket from "./Ticket";

const formsteps = [
  { id: 1, title: "Your info", component: Step1 },
  { id: 2, title: "Event Details", component: Step2 },
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
  //const [formKey, setFormKey] = useState(0);
  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });
  const loadSavedData = useCallback(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, [methods]);

  useEffect(() => {
    loadSavedData();
  }, [loadSavedData]);

  const nextStep = () => {
    sessionStorage.setItem("formData", JSON.stringify(methods.getValues()));
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => setCurrentStep(currentStep - 1);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    sessionStorage.setItem("formData", JSON.stringify(data));
    setShowTicket(true);
  };

  const resetForm = () => {
    methods.reset({
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
      dateTime: "",
      avatarUrl: "",
    });
    sessionStorage.removeItem("formData");
    setCurrentStep(1);
    setShowTicket(false);
    //setFormKey((prevKey) => prevKey + 1);
  };
  const handleCloseTicketModal = () => {
    resetForm();
    setShowTicket(false);
  };

  return (
    <div className="min-h-screen bg-sky-50 shadow-md rounded-lg flex flex-col md:items-center md:justify-center p-0 md:p-4">
      <div className="relative md:w-[940px] md:h-[650px] md:p-4 md:bg-white md:rounded-2xl md:shadow-lg md:flex">
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
                  <p className="text-xs text-[#fbab7c]">STEP {steps.id}</p>
                  <p className="text-sm font-bold text-white">
                    {steps.title.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="p-4 md:flex-1 md:py-8 md:px-16">
          <div className="bg-white -mt-[80px] md:mt-0 rounded-lg md:rounded-none shadow-lg md:shadow-none p-6 md:p-0">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full max-w-lg"
              >
                {currentStep === 1 && <Step1 nextStep={nextStep} />}
                {currentStep === 2 && (
                  <Step2 nextStep={nextStep} prevStep={prevStep} />
                )}
                {currentStep === 3 && <Step3 prevStep={prevStep} />}
              </form>
              {showTicket && (
                <>
                  <Ticket
                    onClose={handleCloseTicketModal}
                    generateNew={resetForm}
                  />
                </>
              )}
            </FormProvider>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MultiStepForm;
