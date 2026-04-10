"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import {
  useRsvpForm,
  useUpdateRsvpForm,
} from "../../contexts/rsvp-form-context";
import { useConfirmReloadPage } from "../../hooks";
import { X, ChevronLeft } from "lucide-react";
import FindYourInvitationForm from "./steps/find-your-invitation";
import ConfirmNameForm from "./steps/confirm-name";
import EventRsvpForm from "./steps/event-rsvp";
import QuestionShortAnswer from "./steps/question-short-answer";
import QuestionMultipleChoice from "./steps/question-multiple-choice";
import SendRsvp from "./steps/send-rsvp";
import MultistepRsvpForm from "./multi-step-form";
import RsvpConfirmation from "../rsvp-confirmation";
import { motion, AnimatePresence } from "framer-motion";

import { type ReactNode } from "react";
import { type RsvpPageData } from "~/app/utils/shared-types";

const NUM_STATIC_STEPS = 4;

export default function MainRsvpForm({
  weddingData,
  basePath,
}: {
  weddingData: RsvpPageData;
  basePath: string;
}) {
  const rsvpFormData = useRsvpForm();
  const numSteps = useRef(NUM_STATIC_STEPS);
  const updateRsvpForm = useUpdateRsvpForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  useConfirmReloadPage(currentStep > 1 && currentStep < numSteps.current);
  
  useEffect(() => {
    updateRsvpForm({ weddingData });
  }, []);

  const submitRsvpForm = api.website.submitRsvpForm.useMutation({
    onSuccess: () => setCurrentStep((prev) => prev + 1),
    onError: (err) => {
      window.alert(err?.message ?? "Error al enviar el RSVP. Por favor, inténtalo de nuevo.");
    },
  });

  const progress = (currentStep / (numSteps.current - 1)) * 100;

  const generateDynamicStepForms = useCallback(() => {
    const newSteps: ReactNode[] = [];
    
    weddingData?.events?.forEach((event) => {
      if (!event.collectRsvp) return;
      
      const invitedGuests = rsvpFormData.selectedHousehold?.guests.filter(
        (guest) =>
          guest.invitations.some(
            (invite) =>
              invite.eventId === event.id &&
              ["Invited", "Attending", "Declined"].includes(invite.rsvp ?? ""),
          ),
      );

      if (invitedGuests && invitedGuests.length > 0) {
        newSteps.push(<EventRsvpForm event={event} invitedGuests={invitedGuests} />);
        
        event.questions.forEach((question) => {
          invitedGuests.forEach((guest) => {
            if (question.type === "Text") {
              newSteps.push(<QuestionShortAnswer question={question} guest={guest} />);
            } else {
              newSteps.push(<QuestionMultipleChoice question={question} guest={guest} />);
            }
          });
        });
      }
    });

    weddingData?.website.generalQuestions.forEach((question) => {
      if (question.type === "Text") {
        newSteps.push(<QuestionShortAnswer question={question} />);
      } else {
        newSteps.push(<QuestionMultipleChoice question={question} />);
      }
    });

    numSteps.current = newSteps.length + NUM_STATIC_STEPS;
    return newSteps;
  }, [weddingData, rsvpFormData.selectedHousehold]);

  const handleClose = () => {
    if (currentStep <= 1 || window.confirm("¿Estás seguro? Tu RSVP aún no ha sido enviado.")) {
      window.location.href = basePath;
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-24 pb-12 px-6">
      {/* Premium Progress Header */}
      <div className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-2xl mx-auto h-20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Proceso de RSVP</span>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Paso {currentStep} de {numSteps.current - 1}
            </span>
            <div className="w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            submitRsvpForm.mutate(rsvpFormData);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-10 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/[0.05]"
            >
              <MultistepRsvpForm
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              >
                <FindYourInvitationForm />
                <ConfirmNameForm />
                {...generateDynamicStepForms()}
                <SendRsvp isFetching={submitRsvpForm.isLoading} />
                <RsvpConfirmation
                  basePath={basePath}
                  setCurrentStep={setCurrentStep}
                />
              </MultistepRsvpForm>
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
