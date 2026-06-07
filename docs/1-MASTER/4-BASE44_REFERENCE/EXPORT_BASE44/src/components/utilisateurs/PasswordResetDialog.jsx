import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

// Action mot de passe séparée du formulaire principal.
export default function PasswordResetDialog({ open, onOpenChange, user, onConfirm, saving }) {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) { setPwd(""); setConfirm(""); setError(""); }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd.length < 12) { setError("12 caractères minimum requis."); return; }
    if (pwd !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    onConfirm(pwd);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><KeyRound size={16} /> Réinitialiser le mot de passe</DialogTitle>
          <DialogDescription>{user?.full_name || user?.email}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Nouveau mot de passe</Label>
            <Input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} autoComplete="new-password" />
          </div>
          <div className="space-y-1.5">
            <Label>Confirmer le mot de passe</Label>
            <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? "..." : "Réinitialiser"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}