import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim() !== "" && password.trim() !== "" && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Identifiants invalides.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Carte de connexion */}
      <div className="relative bg-card rounded-2xl shadow-xl border border-border px-8 pt-14 pb-8">
        {/* Médaillon logo */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-card">
          <Lock size={22} className="text-primary-foreground" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Connexion</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Accédez à votre espace Ambulance Manager.
          </p>
        </div>

        <div className="border-t border-border mb-6" />

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Checkbox
              id="remember"
              checked={remember}
              onCheckedChange={(v) => setRemember(!!v)}
            />
            <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
              Se souvenir de moi
            </Label>
          </div>

          <Button type="submit" className="w-full h-11 font-medium" disabled={!canSubmit}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Connexion
              </>
            )}
          </Button>
        </form>

        <p className="text-[11px] text-center text-muted-foreground mt-6 leading-relaxed">
          En vous connectant, vous acceptez les Mentions d'information.
        </p>
      </div>

      {/* Badges conformité */}
      <div className="flex items-center justify-center gap-2 mt-6 text-[11px] text-muted-foreground">
        <span className="px-2.5 py-1 rounded-full border border-border bg-card">Hébergé en France</span>
        <span className="px-2.5 py-1 rounded-full border border-border bg-card">Conforme RGPD</span>
      </div>
    </div>
  );
}