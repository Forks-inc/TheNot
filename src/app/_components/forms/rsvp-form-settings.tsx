"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useToggleEditRsvpSettingsForm } from "../contexts/edit-rsvp-settings-form-context";
import { sharedStyles } from "~/app/utils/shared-styles";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { TiEyeOutline } from "react-icons/ti";
import { Switch } from "~/components/ui/switch";
import { GoArrowLeft } from "react-icons/go";
import { useScrollToTop } from "../hooks";
import { LoadingSpinner } from "../loaders";
import QuestionForm from "./question-form";
import NoRsvpView from "./rsvp/no-rsvp-view";
import NoQuestionsView from "./rsvp/no-questions.view";
import GeneralQuestionsSection from "./rsvp/general-questions-section";

import { useState, type Dispatch, type SetStateAction } from "react";
import {
  type DashboardData,
  type Question,
  type EventWithResponses,
} from "~/app/utils/shared-types";

export default function RsvpFormSettings({
  dashboardData,
  setShowRsvpSettings,
}: {
  dashboardData: DashboardData;
  setShowRsvpSettings: Dispatch<SetStateAction<boolean>>;
}) {
  useScrollToTop();
  const toggleEditRsvpSettingsForm = useToggleEditRsvpSettingsForm();
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [prefillQuestion, setPrefillQuestion] = useState<Question>();
  const [useEditMode, setUseEditMode] = useState<boolean>(false);

  return (
    <>
      {showQuestionForm && (
        <QuestionForm
          isEditMode={useEditMode}
          question={prefillQuestion!}
          setShowQuestionForm={setShowQuestionForm}
        />
      )}
      <div className="absolute left-0 top-0 flex h-[120px] w-screen items-center bg-zinc-900/50 backdrop-blur-xl border-b border-white/5 pl-10">
        <div
          className="flex cursor-pointer gap-3 text-white transition-colors hover:text-amber-200"
          onClick={() => setShowRsvpSettings(false)}
        >
          <GoArrowLeft size={36} />
          <span className="text-2xl font-light tracking-tight">Configuración de <span className="font-bold italic">Asistencia</span></span>
        </div>
      </div>
      <div className="m-auto w-[800px] pt-32">
        <div className="mt-10 flex items-center gap-4 rounded-2xl bg-amber-200/5 p-6 border border-amber-200/20 backdrop-blur-xl">
          <TiEyeOutline size={30} className="text-amber-200" />
          <div className="text-sm text-zinc-300">
            Este formulario es <b className="text-amber-200 uppercase tracking-widest text-[10px]">Visible</b> en tu sitio web. Los invitados de tu lista pueden confirmar su asistencia.{" "}
            <button className="underline text-white font-semibold hover:text-amber-200 transition-colors" onClick={toggleEditRsvpSettingsForm}>
              Ver Configuración
            </button>
          </div>
        </div>
        <ul className="mt-8 space-y-12">
          {dashboardData?.events.map((event) => {
            const { attending, invited, declined } = event.guestResponses;
            const numGuests = attending + invited + declined;
            return (
              <section key={event.id} className="pb-12 border-b border-white/5">
                <EventRsvpSection
                  event={event}
                  numGuests={numGuests}
                  setUseEditMode={setUseEditMode}
                  setPrefillQuestion={setPrefillQuestion}
                  setShowQuestionForm={setShowQuestionForm}
                />
              </section>
            );
          })}
        </ul>
        <GeneralQuestionsSection
          website={dashboardData?.weddingData.website}
          setUseEditMode={setUseEditMode}
          setPrefillQuestion={setPrefillQuestion}
          setShowQuestionForm={setShowQuestionForm}
        />
      </div>
    </>
  );
}

type EventRsvpSectionProps = {
  event: EventWithResponses;
  numGuests: number;
  setUseEditMode: Dispatch<SetStateAction<boolean>>;
  setPrefillQuestion: Dispatch<SetStateAction<Question | undefined>>;
  setShowQuestionForm: Dispatch<SetStateAction<boolean>>;
};

const EventRsvpSection = ({
  event,
  numGuests,
  setUseEditMode,
  setPrefillQuestion,
  setShowQuestionForm,
}: EventRsvpSectionProps) => {
  const router = useRouter();
  const updateEventRsvpSetting = api.event.updateCollectRsvp.useMutation({
    onSuccess: () => router.refresh(),
    onError: (err) => {
      if (err) window.alert(err);
      else window.alert("Failed to update event! Please try again later.");
    },
  });

  const onAddQuestion = (eventId: string) => {
    setUseEditMode(false);
    setPrefillQuestion({
      id: undefined,
      eventId,
      text: "",
      type: "Text",
      isRequired: false,
    });
    setShowQuestionForm(true);
  };
  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold text-white">{event.name}</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Recibir RSVPs</span>
          {updateEventRsvpSetting.isLoading ? (
            <LoadingSpinner size={20} />
          ) : (
            <Switch
              id={`${event.id}-rsvp-toggle`}
              checked={event.collectRsvp}
              onCheckedChange={() =>
                updateEventRsvpSetting.mutate({
                  eventId: event.id,
                  collectRsvp: !event.collectRsvp,
                })
              }
            />
          )}
        </div>
      </div>
      {event.collectRsvp && (event.questions?.length ?? 0) > 0 ? (
        <>
          <p className="text-sm text-zinc-400">
            Se le pedirá responder a estas preguntas a los {numGuests} invitados en la lista de{" "}
            <span className="font-semibold text-amber-200 underline">{event.name}</span>{" "}
            que confirmen su asistencia.
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {event.questions?.map((question) => {
              return (
                <li key={question.id} className="rounded-2xl border border-white/10 bg-black/20 p-5 group transition-all hover:border-amber-200/30">
                  <div className="flex items-center justify-between">
                    {question.type === "Text" ? (
                      <p className="text-sm text-white">{question.text}</p>
                    ) : (
                      <div>
                        <p className="text-sm text-white">{question.text}</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                          {question.options?.length} opciones
                        </span>
                      </div>
                    )}
                    <BsPencil
                      size={18}
                      className="cursor-pointer text-zinc-500 transition-colors group-hover:text-amber-200"
                      onClick={() => {
                        setUseEditMode(true);
                        setPrefillQuestion(question);
                        setShowQuestionForm(true);
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div
            className="mt-6 flex w-fit cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-200/80 transition-all hover:text-amber-200 hover:underline underline-offset-4"
            onClick={() => onAddQuestion(event.id)}
          >
            <AiOutlinePlusCircle size={20} />
            <span>Agregar Pregunta de Seguimiento</span>
          </div>
        </>
      ) : event.collectRsvp ? (
        <NoQuestionsView event={event} onAddQuestion={onAddQuestion} />
      ) : (
        <NoRsvpView />
      )}
    </>
  );
};
