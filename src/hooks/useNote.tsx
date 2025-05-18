"use client"

"use client";

import { NoteProviderContext } from "@/providers/NoteProvider";
import { useContext } from "react";

function useNote() {
  const context = useContext(NoteProviderContext);

  if (!context) throw new Error("useNote must be used within a NoteProvider");

  return context;
}

export default useNote;
// This hook is used to access the note text and the function to set the note text
// from the NoteProvider context. It throws an error if used outside of the NoteProvider.