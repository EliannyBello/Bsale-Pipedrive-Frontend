// app/dashboard/configuraciones/pageOld.tsx
'use client'

import React, {useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
// import ConfiguracionCostos from "@/app/dashboard/configuraciones/CostsConfigs";
// import FieldAssociationManager from "@/components/associationManager/FieldAssociationManager";

export default function ConfiguracionesPage() {
  const [activeTab, setActiveTab] = useState('otras')

  return (
      <div className="flex-1 space-y-6 p-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Configuraciones</h1>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {/*<TabsTrigger value="relaciones">Relaciones Rut - Empresa</TabsTrigger>*/}
            {/*<TabsTrigger value="costos">Costos de Aduana</TabsTrigger>*/}
            <TabsTrigger value="otras">Otras Configuraciones</TabsTrigger>
          </TabsList>
          <TabsContent value="relaciones">
              {/* <FieldAssociationManager /> */}
            {/*<Card>*/}
            {/*  <CardHeader>*/}
            {/*    <CardTitle>Gestión de Relaciones Cliente-Sucursal</CardTitle>*/}
            {/*  </CardHeader>*/}
            {/*  <CardContent>*/}
            {/*    <div className="space-y-6">*/}
            {/*      <RelationshipForm />*/}
            {/*      <RelationshipTable />*/}
            {/*    </div>*/}
            {/*  </CardContent>*/}
            {/*</Card>*/}
          </TabsContent>
          <TabsContent value="otras">
            <Card>
              <CardHeader>
                <CardTitle>Otras Configuraciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Aquí puedes agregar otras configuraciones de la aplicación.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="costos">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Costos de Aduana</CardTitle>
              </CardHeader>
              <CardContent>
                  {/* <ConfiguracionCostos /> */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}