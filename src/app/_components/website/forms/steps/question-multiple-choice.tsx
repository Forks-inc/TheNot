"use client";

import { useState } from "react";
import { Check, ArrowLeft, ArrowRight, User, HelpCircle } from "lucide-react";
import {
  useRsvpForm,
  useUpdateRsvpForm,
} from "~/app/_components/contexts/rsvp-form-context";
import { motion } from "framer-motion";

import {
  type Question,
  type Guest,
  type StepFormProps,
} from "~/app/utils/shared-types";

interface QuestionMultipleChoiceProps extends StepFormProps {
  guest?: Guest;
  question: Question;
}

export default function QuestionMultipleChoice({
  goNext,
  goBack,
  guest,
  question,
}: QuestionMultipleChoiceProps) {
  const rsvpFormData = useRsvpForm();
  const updateRsvpForm = useUpdateRsvpForm();
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>();

  const onContinue = () => {
    updateRsvpForm({
      answersToQuestions: [
        ...rsvpFormData.answersToQuestions,
        {
          questionId: question.id ?? "-1",
          questionType: "Option",
          response: selectedOptionId!,
          guestId: guest?.id,
          householdId: rsvpFormData.selectedHousehold?.id,
          guestFirstName:
            guest?.firstName ??
            rsvpFormData.selectedHousehold?.primaryContact?.firstName,
          guestLastName:
            guest?.lastName ??
            rsvpFormData.selectedHousehold?.primaryContact?.lastName,
        },
      ],
    });
    goNext && goNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
          <HelpCircle className="h-3 w-3" />
          Selection
        </span>
        <h2 className="text-3xl font-black italic tracking-tighter text-white leading-tight">
          {question.text}
        </h2>
        {!!guest && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] w-fit">
            <User className="h-3 w-3 text-zinc-500" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mt-0.5">
              {guest.firstName} {guest.lastName}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <motion.div
              key={option.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedOptionId(option.id)}
              className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between group ${
                isSelected
                  ? "bg-primary/5 border-primary/30"
                  : "bg-white/[0.02] border-zinc-900 lg:hover:border-zinc-700"
              }`}
            >
              <div className="space-y-1">
                <h3 className={`text-sm font-bold transition-colors ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"}`}>
                  {option.text}
                </h3>
                {option.description && (
                  <p className="text-xs text-zinc-600 leading-relaxed font-light">
                    {option.description}
                  </p>
                )}
              </div>
              {isSelected && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 ml-4">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-4 pt-4">
        <button
          type="button"
          disabled={!selectedOptionId}
          onClick={onContinue}
          className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all hover:text-white disabled:opacity-20 flex items-center justify-center gap-3 group"
        >
          <span>Continue</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => goBack && goBack()}
            className="py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Go Back</span>
          </button>
          
          {!question.isRequired && (
            <button
              type="button"
              onClick={() => goNext && goNext()}
              className="py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
            >
              Skip Question
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
