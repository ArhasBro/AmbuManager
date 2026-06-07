import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccessDeniedState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-4">
        <ShieldAlert size={32} />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">Accès refusé</h1>
      <p className="text-muted-foreground max-w-md mb-6 text-sm">
        Vous êtes connecté, mais vous ne disposez pas des permissions nécessaires pour accéder à cette page.
      </p>
      <Button asChild variant="outline">
        <Link to="/">Retour au tableau de bord</Link>
      </Button>
    </div>
  );
}