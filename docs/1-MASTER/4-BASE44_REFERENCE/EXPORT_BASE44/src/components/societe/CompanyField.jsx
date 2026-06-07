import React from "react";
import { Input } from "@/components/ui/input";

export default function CompanyField({ label, value, onChange, placeholder, disabled }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-9 text-sm" disabled={disabled} />
    </div>
  );
}