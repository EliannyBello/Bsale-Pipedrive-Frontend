'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { MoreHorizontal } from "lucide-react";


import { EnumLang, EnumState } from '@/app/api/common/interface/queryParams.interface';

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ClientTableHeader } from '@/components/table/headers/ClientTableHeader'
import { ClientTableRow } from '@/components/table/rows/ClientTableRow'
import { TablePagination } from '@/components/table/TablePagination';


import { SearchBar } from '@/components/table/SearchBar';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import ErrorModal from "@/components/ErrorModal";
import { exportToExcel, fetchAllCards } from '@/app/api/document/document.api';
import { Spinner } from '@/components/Spinner';
import { IClientResponse } from '@/app/api/clients/client.interface';
import { useClientStore } from '@/app/store/clientStore';
import { getClient } from '@/app/api/clients/client.api';
;

export default function CardPage() {
  const { filters, setFilters, loading, meta, items, fetchData } = useClientStore()

  const [hasOpenErrorModal, setOpenErrorModal] = useState(false);
  const [clientData, setClientData] = useState<IClientResponse | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filtersModal, setFiltersModal] = useState(false);
  const [activeTab, setActiveTab] = useState('datos');


  // ABRE O CIERRA EL MODAL DE FILTROS
  const onOpenChange = (isOpen: boolean) => {
    setFiltersModal(isOpen);
  }

  // ABRIR MODAL DE DETALLES
  const showDetails = async (client: IClientResponse) => {
    try {
      const { _id } = client;
      const clientDetails = await getClient(_id);
      if (!clientDetails) {
        throw new Error("No se encontraron detalles del cliente");
      }
      setDetailsModalOpen(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error al cargar los detalles");
      setOpenErrorModal(true);
      // Cerramos el modal de detalles en caso de error
      setDetailsModalOpen(false);
    }
  }

  // Maneja el cambio de página en la paginación
  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  // Maneja el cambio de estado en los filtros
  const handleStateChange = (status: EnumState | string) => {
    setFilters({ ...filters, status })
  }

  // LIMPIA LOS FILTROS
  const handleClearFilters = () => {
    setFilters({
      ...filters, // Mantiene los otros filtros intactos
      status: undefined,
      lang: undefined, // 
      page: 1,
    });
    onOpenChange(false)
  };
  // APPLICA LOS FILTROS Y CIERRA EL MODAL
  const handleApplyFilters = () => {
    onOpenChange(false); // Cierra el modal
  };

  // BUSCA CARTAS POR NOMBRE
  const handleSearchChange = useCallback(async (search: string) => {
    setFilters({ ...filters, search, page: 1 });
  }, [])
  const memoizedSearchBar = useMemo(() => <SearchBar initialSearchValue="" onSearchChangeAction={handleSearchChange} loading={loading} />,
    [handleSearchChange, loading],
  )


  // MANEJA EL CAMBIO DE FECHA
  const handleChangeDate = (dateRange: DateRange | undefined) => {
    if (dateRange) {
      //La fecha viene en formato Tue Jan 28 2025 14:48:32 GMT-0300 (hora de verano de Chile), la necesito en YYYY-MM-DD
      const formatWithLeadingZero = (num: number) => num < 10 ? `0${num}` : num;

      const from = dateRange.from ? `${dateRange.from.getFullYear()}-${formatWithLeadingZero(dateRange.from.getMonth() + 1)}-${formatWithLeadingZero(dateRange.from.getDate())}` : '';
      const to = dateRange.to ? `${dateRange.to?.getFullYear()}-${formatWithLeadingZero(dateRange.to.getMonth() + 1)}-${formatWithLeadingZero(dateRange.to.getDate())}` : '';

      setFilters({
        ...filters,
        from: from,
        to: to,
        page: 1, 
      })
    }
  }

  // LIMPIA EL RANGO DE FECHAS
  const handleClearDate = () => {
    setFilters({
      ...filters,
      from: "",
      to: "",
    })
  }


  const handleExport = async () => {
    try {
      const cards = await fetchAllCards();
      exportToExcel(cards, "Cards");
    } catch (error) {
      console.error("Error exporting cards:", error);
    }
  };


    // Manejo de acciones del menú desplegable
  const handleActions = (client: IClientResponse) => (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setDetailsModalOpen(true)} onClick={() => showDetails(client)}>Ver Detalles</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* {isDetailsModalOpen && receptionData && (
        <ReceptionModalDetails
          data={receptionData}
          open={isDetailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          loading={loading}
        />
      )} */}
    </div>
  )

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Panel de Clientes</h1>
          <DateRangeFilter onFilter={handleChangeDate} handleClearDate={handleClearDate} />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="datos">Tabla de Clientes</TabsTrigger>
          </TabsList>
          <TabsContent value="datos">
            <Card className="p-1">
              <CardContent>
                <div className="flex justify-between my-5" >
                  {memoizedSearchBar}
                  <div>
                    <Button className='mx-3' onClick={() => setFiltersModal(true)}>Filtrar Información</Button>
                    <Button onClick={handleExport}>Exportar Excel</Button>
                  </div>
                </div>
                {loading ? <Spinner /> :
                  <Table>
                    <ClientTableHeader />
                    <TableBody>
                      {items.map((client) => (
                        <ClientTableRow
                          key={client._id}
                          item={client}
                          handleActions={handleActions(client)}
                        />
                      ))}
                    </TableBody>
                  </Table>
                }
                <div className='mt-5'>
                  <TablePagination meta={meta} onPageChange={handlePageChange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <ErrorModal
        isOpen={hasOpenErrorModal}
        onClose={() => setOpenErrorModal(false)}
        title="Error Sincronizando Abastecimiento"
        description="No se pudo procesar la orden de abastecimiento"
        message={errorMessage ? errorMessage : "Lo sentimos, ha ocurrido un error al procesar su orden de abastecimiento. Nuestro equipo técnico ha sido notificado y estamos trabajando para resolverlo. Por favor, intente nuevamente más tarde."}
        textButton="Entendido"
      />

    </>
  )
}
