"use client";

import { useState } from "react";
import { Plus, Check, Trash2, StickyNote } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Note {
    id: string;
    text: string;
    completed: boolean;
}

// Dummy notes data
const initialNotes: Note[] = [
    { id: "1", text: "Review patient Michael Brown's ECG results", completed: false },
    { id: "2", text: "Update prescription for Mrs. Anderson", completed: false },
    { id: "3", text: "Call lab for blood test reports", completed: true },
    { id: "4", text: "Prepare presentation for next week's conference", completed: false },
];

export function DoctorNotes() {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [newNote, setNewNote] = useState("");

    const addNote = () => {
        if (!newNote.trim()) return;

        setNotes([
            ...notes,
            {
                id: Date.now().toString(),
                text: newNote.trim(),
                completed: false,
            },
        ]);
        setNewNote("");
    };

    const toggleNote = (id: string) => {
        setNotes(
            notes.map((note) =>
                note.id === id ? { ...note, completed: !note.completed } : note
            )
        );
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addNote();
        }
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5 text-corporate-blue" />
                    Quick Notes
                </CardTitle>
                <CardAction>
                    <span className="text-xs text-muted-foreground">
                        {notes.filter((n) => !n.completed).length} pending
                    </span>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add Note Input */}
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Add a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1"
                    />
                    <Button onClick={addNote} size="icon" className="shrink-0">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Notes List */}
                <div className="space-y-2 max-h-[280px] overflow-y-auto">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className={cn(
                                "group flex items-start gap-3 rounded-lg border border-border p-3 transition-all",
                                note.completed && "bg-muted/50"
                            )}
                        >
                            {/* Checkbox */}
                            <button
                                onClick={() => toggleNote(note.id)}
                                className={cn(
                                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all",
                                    note.completed
                                        ? "border-emergency bg-emergency text-white"
                                        : "border-muted-foreground/30 hover:border-corporate-blue"
                                )}
                            >
                                {note.completed && (
                                    <Check className="h-3 w-3" />
                                )}
                            </button>

                            {/* Text */}
                            <p
                                className={cn(
                                    "flex-1 text-sm transition-all",
                                    note.completed &&
                                    "text-muted-foreground line-through"
                                )}
                            >
                                {note.text}
                            </p>

                            {/* Delete Button */}
                            <Button
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => deleteNote(note.id)}
                                className="shrink-0 opacity-0 text-muted-foreground hover:text-destructive group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    ))}

                    {notes.length === 0 && (
                        <p className="text-center text-sm text-muted-foreground py-6">
                            No notes yet. Add one above!
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
