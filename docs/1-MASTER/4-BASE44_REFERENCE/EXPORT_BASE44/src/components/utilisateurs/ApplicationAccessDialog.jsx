import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export default function ApplicationAccessDialog({ open, onOpenChange, user, onConfirm, saving, existingEmail }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open) {
      setEmail(existingEmail || user?.email || "");
    }
  }, [open, existingEmail, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onConfirm(email);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Créer un accès applicatif</DialogTitle>
          <DialogDescription>
            {user?.full_name || user?.email} n'a pas encore de compte de connexion. Créez ou associez un compte applicatif pour lui permettre d'accéder à l'application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 flex gap-2.5">
            <Mail className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
            <div className="text-xs text-blue-700 leading-relaxed">
              Un email d'invitation sera envoyé à cette adresse pour activer le compte.
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Email de connexion *</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prenom.nom@societe.fr"
              required
              disabled={saving}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={saving || !email}>
              {saving ? "Création..." : "Créer l'accès"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}