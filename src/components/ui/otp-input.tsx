"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function OTPInput({
    length = 6,
    value,
    onChange,
    disabled = false,
}: OTPInputProps) {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, inputValue: string) => {
        // Only allow digits
        const digit = inputValue.replace(/\D/g, "").slice(-1);

        const newValue = value.split("");
        newValue[index] = digit;

        // Pad with empty strings if needed
        while (newValue.length < length) {
            newValue.push("");
        }

        onChange(newValue.join(""));

        // Move to next input if digit entered
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
        const newValue = pastedData.slice(0, length).padEnd(length, "");
        onChange(newValue);

        // Focus last filled input or first empty
        const lastIndex = Math.min(pastedData.length, length) - 1;
        if (lastIndex >= 0) {
            inputRefs.current[lastIndex]?.focus();
        }
    };

    return (
        <div className="flex gap-2 sm:gap-3 justify-center">
            {Array.from({ length }).map((_, index) => (
                <Input
                    key={index}
                    ref={el => {
                        inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    className={cn(
                        "w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold rounded-xl",
                        "focus:ring-2 focus:ring-corporate-blue focus:border-corporate-blue"
                    )}
                    aria-label={`OTP digit ${index + 1}`}
                />
            ))}
        </div>
    );
}
