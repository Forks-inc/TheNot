"use client";

import "chart.js/auto";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Users, Download, MessageSquare, ChevronRight, BarChart3 } from "lucide-react";
import { generateRandomColor } from "~/app/utils/helpers";
import { sharedStyles } from "~/app/utils/shared-styles";
import { motion } from "framer-motion";

import { type Question, type Event } from "../../../utils/shared-types";

const chartOptions = {
  maintainAspectRatio: true,
  responsive: true,
  cutout: '75%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 12, weight: 'bold' as const },
      bodyFont: { size: 12 },
      padding: 12,
      cornerRadius: 12,
      displayColors: true,
    }
  },
} as const;

type GuestResponses = {
  attending: number;
  declined: number;
  invited: number;
  notInvited: number;
};

interface EventWithGuestResponses extends Event {
  guestResponses: GuestResponses;
}

type RsvpContentProps = {
  events: EventWithGuestResponses[] | undefined | null;
  totalGuests: number;
  generalQuestions: Question[];
};

export default function RsvpContent({
  events,
  totalGuests,
  generalQuestions,
}: RsvpContentProps) {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {events?.map((event) => {
          const numInvitedGuests = totalGuests - event.guestResponses.notInvited;
          
          if (!event.collectRsvp) {
            return (
              <div key={event.id} className="glass-card p-10 rounded-[3rem] bg-zinc-950/20 border border-white/5 flex items-center justify-between mx-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic text-white tracking-tight">{event.name}</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 w-fit">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      No se están recibiendo confirmaciones
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <motion.div 
              key={event.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-10 space-y-8"
            >
              <div className="flex items-end justify-between border-b border-white/5 pb-8">
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Reporte de Confirmación</div>
                  <h3 className="text-4xl font-black italic text-white tracking-tighter">{event.name}</h3>
                </div>
                
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <Users className="h-4 w-4 text-amber-200/50" />
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    <span className="text-white">{numInvitedGuests}</span> Invitados
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AttendanceChart
                  event={event}
                  numInvitedGuests={numInvitedGuests}
                />
                <div className="grid grid-cols-1 gap-8">
                  <QuestionCards questions={event.questions} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {generalQuestions.length > 0 && (
        <div className="px-10 space-y-8 pt-12 border-t border-white/5">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Feedback General</div>
            <h3 className="text-4xl font-black italic text-white tracking-tighter">Preguntas Generales</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuestionCards questions={generalQuestions} />
          </div>
        </div>
      )}

      <div className="mx-10 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-amber-500/20 transition-all">
        <div className="flex items-center gap-4 text-zinc-400">
          <div className="p-4 rounded-2xl bg-zinc-950/50 border border-white/5 group-hover:scale-110 transition-transform">
            <Download className="h-5 w-5 text-amber-200/50" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-widest text-white">Base de Datos Completa</p>
            <p className="text-[10px] font-medium tracking-wide">Exporta todas las respuestas en formato Excel/CSV</p>
          </div>
        </div>
        
        <button 
          type="button"
          className="px-10 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-amber-200 transition-all transform active:scale-95 shadow-xl shadow-white/5 flex items-center gap-3 w-full sm:w-auto justify-center"
        >
          <Download className="h-4 w-4" />
          <span>Descargar Todo</span>
        </button>
      </div>
    </div>
  );
}

type AttendanceChartProps = {
  event: EventWithGuestResponses;
  numInvitedGuests: number;
};

const AttendanceChart = ({ event, numInvitedGuests }: AttendanceChartProps) => {
  const getChartData = (guestResponses: GuestResponses | null) => {
    return {
      labels: ["Confirmados", "Declinados", "Pendientes"],
      datasets: [
        {
          data: [
            guestResponses?.attending ?? 0,
            guestResponses?.declined ?? 0,
            guestResponses?.invited ?? 0,
          ],
          backgroundColor: [
            "rgba(167, 139, 250, 1)", // violet-400
            "rgba(244, 63, 94, 1)",   // rose-500
            "rgba(39, 39, 42, 1)",   // zinc-800
          ],
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 2,
          hoverOffset: 4,
        },
      ],
    };
  };

  const totalResponded = event.guestResponses.attending + event.guestResponses.declined;

  return (
    <div className="glass-card p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 flex flex-col sm:flex-row items-center gap-12 group hover:border-violet-500/20 transition-all">
      <div className="relative h-48 w-48">
        <Doughnut
          data={getChartData(event.guestResponses)}
          options={chartOptions}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-4xl font-black text-white italic tracking-tighter">{totalResponded}</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mt-1 max-w-[80px]">
            de {numInvitedGuests} respondieron
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-6">
        <div className="pb-2 border-b border-white/5">
          <h5 className="text-xl font-black italic text-white tracking-tight uppercase antialiased">¿Asistirán?</h5>
        </div>

        <div className="space-y-3">
          {[
            { label: "Confirmados", value: event.guestResponses.attending, color: "bg-violet-400" },
            { label: "Declinados", value: event.guestResponses.declined, color: "bg-rose-500" },
            { label: "Pendientes", value: event.guestResponses.invited, color: "bg-zinc-800" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/40 border border-white/5 group/row hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${stat.color} shadow-lg`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover/row:text-zinc-200 transition-colors">
                  {stat.label}
                </span>
              </div>
              <span className="text-sm font-black text-white italic">{stat.value}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/guest-list?event=${event.id}`}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-zinc-950/50 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:border-violet-500/30 transition-all active:scale-95"
        >
          <Users className="h-3.5 w-3.5" />
          <span>Gestionar Lista de Invitados</span>
        </Link>
      </div>
    </div>
  );
};

const QuestionCards = ({ questions }: { questions: Question[] }) => {
  return (
    <>
      {questions?.map((question) => {
        return (
          <div key={question.id} className="space-y-4">
            {question.type === "Text" ? (
              <TextQuestionCard question={question} />
            ) : (
              <OptionQuestionCard question={question} />
            )}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-amber-200 transition-colors pl-6"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Descargar Respuestas</span>
            </Link>
          </div>
        );
      })}
    </>
  );
};

const TextQuestionCard = ({ question }: { question: Question }) => {
  if (!question?._count) return null;
  
  return (
    <div className="glass-card p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 flex flex-col gap-8 group hover:border-amber-500/20 transition-all min-h-[300px]">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-amber-500/50" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Pregunta Abierta</span>
        </div>
        <h5 className="text-xl font-black italic text-white tracking-tight uppercase antialiased">{question.text}</h5>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col items-center justify-center text-center p-8 rounded-[2.5rem] bg-zinc-950/50 border border-white/5 min-w-[140px] border-l-amber-500/30 border-l-4">
          <span className="text-4xl font-black text-white italic tracking-tighter">{question._count.answers}</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mt-1">
            Respondieron
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Respuesta más reciente</div>
          {question.recentAnswer ? (
            <div className="space-y-4">
              <blockquote className="text-lg font-medium text-white italic tracking-wide leading-relaxed pl-6 border-l-2 border-amber-500/20">
                &quot;{question.recentAnswer.response}&quot;
              </blockquote>
              <div className="flex items-center gap-2 pl-6">
                <div className="h-4 w-4 rounded-full bg-zinc-800" />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-200/50">
                  - {question.recentAnswer.guestFirstName} {question.recentAnswer.guestLastName}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-800 italic">
              Sin respuestas aún
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OptionQuestionCard = ({ question }: { question: Question }) => {
  const totalResponses = useMemo(
    () => question.options?.reduce((acc, option) => acc + option.responseCount, 0) ?? 0,
    [question.options]
  );
  
  const chartColors = useMemo(
    () => question.options?.map((_, i) => `hsla(${210 + (i * 30)}, 70%, 60%, 1)`),
    [question.options]
  );

  const getChartData = useCallback(() => {
    return {
      labels: question.options?.map((option) => option.text),
      datasets: [
        {
          data: question.options?.map((option) => option.responseCount),
          backgroundColor: chartColors,
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    };
  }, [question.options, chartColors]);

  return (
    <div className="glass-card p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 flex flex-col sm:flex-row items-center gap-10 group hover:border-amber-500/20 transition-all">
      <div className="relative h-40 w-40 flex-shrink-0">
        <Doughnut data={getChartData()} options={chartOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-3xl font-black text-white italic tracking-tighter">{totalResponses}</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
            En total
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-6">
        <div className="space-y-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-amber-500/50" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Opción Múltiple</span>
          </div>
          <h5 className="text-xl font-black italic text-white tracking-tight uppercase antialiased">{question.text}</h5>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {question.options?.map((option, i) => (
            <div key={option.id} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/40 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: chartColors?.[i] }} />
                <span className={`text-[10px] font-black uppercase tracking-widest text-zinc-400 max-w-[140px] truncate`}>
                  {option.text}
                </span>
              </div>
              <span className="text-sm font-black text-white italic">{option.responseCount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
