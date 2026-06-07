import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuiviVueEnsemble from "@/components/suivi/SuiviVueEnsemble";
import SuiviVerifications from "@/components/suivi/SuiviVerifications";
import SuiviAnomalies from "@/components/suivi/SuiviAnomalies";
import SuiviDesinfection from "@/components/suivi/SuiviDesinfection";

export default function SuiviVehicules() {
  const [activeTab, setActiveTab] = useState("apercu");

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Suivi des véhicules</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Synthèse opérationnelle, vérifications, désinfections et anomalies des véhicules.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-9 bg-muted/50 border border-border">
          <TabsTrigger value="apercu" className="text-xs px-3 h-7">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="verifications" className="text-xs px-3 h-7">Vérifications</TabsTrigger>
          <TabsTrigger value="desinfection" className="text-xs px-3 h-7">Désinfections</TabsTrigger>
          <TabsTrigger value="anomalies" className="text-xs px-3 h-7">Anomalies des véhicules</TabsTrigger>
        </TabsList>

        <TabsContent value="apercu" className="mt-4"><SuiviVueEnsemble onGoTab={setActiveTab} /></TabsContent>
        <TabsContent value="verifications" className="mt-4"><SuiviVerifications /></TabsContent>
        <TabsContent value="desinfection" className="mt-4"><SuiviDesinfection /></TabsContent>
        <TabsContent value="anomalies" className="mt-4"><SuiviAnomalies /></TabsContent>
      </Tabs>
    </div>
  );
}