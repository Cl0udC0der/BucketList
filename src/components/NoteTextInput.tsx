"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;
// When you're typing, it will wait 1.5 seconds before sending the update to the server

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  // Hook and client component, will update the URL when the noteId changes
  const { noteText, setNoteText } = useNote();
  // Create global state for noteText, so notes on the side will update live

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
      // Update for the global state
    }
  }, [startingNoteText, noteIdParam, noteId, setNoteText]);
  // Best practice to add all dependencies to the useEffect

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setNoteText(text);

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, 1500);
    // Wait 1.5 seconds before sending the update to the server
    // This is to prevent sending too many requests to the server
  };

  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type your notes here.."
      className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

export default NoteTextInput;
