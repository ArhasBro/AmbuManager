import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlanningGlobal from "@/components/planning/PlanningGlobal";
import PlanningPersonnel from "@/components/planning/PlanningPersonnel";
import PlanningMois from "@/components/planning/PlanningMois";
import PlanningSemaine from "@/components/planning/PlanningSemaine";
import PlanningJour from "@/components/planning/PlanningJour";

export default function Planning() {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Planning</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Gérez les plannings et affectations de vos équipes.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-9 bg-muted/50 border border-border">
          <TabsTrigger value="global" className="text-xs px-3 h-7">Vue globale annuelle</TabsTrigger>
          <TabsTrigger value="personnel" className="text-xs px-3 h-7">Vue personnelle</TabsTrigger>
          <TabsTrigger value="mois" className="text-xs px-3 h-7">Vue mois</TabsTrigger>
          <TabsTrigger value="semaine" className="text-xs px-3 h-7">Vue semaine</TabsTrigger>
          <TabsTrigger value="jour" className="text-xs px-3 h-7">Vue jour</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-4"><PlanningGlobal /></TabsContent>
        <TabsContent value="personnel" className="mt-4"><PlanningPersonnel /></TabsContent>
        <TabsContent value="mois" className="mt-4"><PlanningMois /></TabsContent>
        <TabsContent value="semaine" className="mt-4"><PlanningSemaine /></TabsContent>
        <TabsContent value="jour" className="mt-4"><PlanningJour /></TabsContent>
      </Tabs>
    </div>
  );
}