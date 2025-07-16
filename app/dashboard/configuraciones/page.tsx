// app/dashboard/configuraciones/pageOld.tsx
'use client'

import React, {useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
// import ConfiguracionCostos from "@/app/dashboard/configuraciones/CostsConfigs";
// import FieldAssociationManager from "@/components/associationManager/FieldAssociationManager";

export default function ConfiguracionesPage() {
  const [activeTab, setActiveTab] = useState('credenciales')

  return (
    <div className="flex-1 space-y-6 p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Configuraciones</h1>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-center">
            <TabsList className="bg-blue-100 rounded-lg p-1 mb-3 flex w-full justify-between">
            <TabsTrigger value="credenciales" className="flex-1">Credenciales Empresa</TabsTrigger>
            <TabsTrigger value="costos" className="flex-1">Costos</TabsTrigger>
            <TabsTrigger value="integraciones" className="flex-1">Integraciones</TabsTrigger>
            </TabsList>
        </div>
        <TabsContent value="credenciales">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Credenciales de la Empresa</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input
                    type="text"
                    id="apiKey"
                    name="apiKey"
                    placeholder="API Key de la empresa"
                    className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label htmlFor="apiSecret" className="block text-sm font-medium text-gray-700 mb-1">API Secret</label>
                  <input
                    type="password"
                    id="apiSecret"
                    name="apiSecret"
                    placeholder="API Secret de la empresa"
                    className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">Cancelar</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition">Guardar</button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="costos">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Configuración de Costos</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <label htmlFor="aduana" className="block text-sm font-medium text-gray-700 mb-1">Costo de Aduana</label>
                  <input
                    type="number"
                    id="aduana"
                    name="aduana"
                    placeholder="Ej: 1000"
                    className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label htmlFor="impuestos" className="block text-sm font-medium text-gray-700 mb-1">Impuestos</label>
                  <input
                    type="number"
                    id="impuestos"
                    name="impuestos"
                    placeholder="Ej: 19%"
                    className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">Cancelar</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition">Guardar</button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integraciones">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Integraciones</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <label htmlFor="pipedriveKey" className="block text-sm font-medium text-gray-700 mb-1">Pipedrive API Key</label>
                  <input
                    type="text"
                    id="pipedriveKey"
                    name="pipedriveKey"
                    placeholder="API Key de Pipedrive"
                    className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label htmlFor="bsaleKey" className="block text-sm font-medium text-gray-700 mb-1">Bsale API Key</label>
                  <input
                    type="text"
                    id="bsaleKey"
                    name="bsaleKey"
                    placeholder="API Key de Bsale"
                    className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition">Cancelar</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition">Guardar</button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}