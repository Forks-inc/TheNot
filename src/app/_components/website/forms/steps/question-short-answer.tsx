"use client";

import { useState } from "react";
import {
  useRsvpForm,
  useUpdateRsvpForm,
} from "~/app/_components/contexts/rsvp-form-context";
import { ArrowLeft, ArrowRight, User, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  type Question,
  type Guest,
  type StepFormProps,
} from "~/app/utils/shared-types";

interface QuestionShortAnswerProps extends StepFormProps {
  guest?: Guest;
  question: Question;
}

export default function QuestionShortAnswer({
  goNext,
  goBack,
  guest,
  question,
}: QuestionShortAnswerProps) {
  const rsvpFormData = useRsvpForm();
  const updateRsvpForm = useUpdateRsvpForm();
  const [answer, setAnswer] = useState("");

  const onContinue = () => {
    updateRsvpForm({
      answersToQuestions: [
        ...rsvpFormData.answersToQuestions,
        {
          questionId: question.id ?? "-1",
          questionType: "Text",
          response: answer,
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
          Question
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

      <div className="relative group">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Share your response..."
          className="w-full h-40 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 text-lg text-white placeholder:text-zinc-700 focus:border-primary outline-none transition-all resize-none"
        />
        <div className="absolute bottom-6 right-8 text-[10px] font-bold text-zinc-800 pointer-events-none uppercase tracking-widest">
          {answer.length} Characters
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <button
          type="button"
          disabled={question.isRequired && !answer}
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
