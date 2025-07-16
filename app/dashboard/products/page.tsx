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

import { TablePagination } from '@/components/table/TablePagination';
import CardModal from '@/components/modal/CardModal';
import { SearchBar } from '@/components/table/SearchBar';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import ErrorModal from "@/components/ErrorModal";
import { ProductTableHeader } from '@/components/table/headers/ProductTableHeader';
import { ProductTableRow } from '@/components/table/rows/ProductTableRow';
import { useProductStore } from '@/app/store/productStore';
import { getProductById } from '@/app/api/products/product.api';
import { IProductResponse } from '@/app/api/products/product.interface';
import ProductModal from '@/components/modal/ProductModal';
import { exportToExcel, fetchAllProducts, transformProductsForExport } from '@/app/api/document/document.api';
import { ProductFilter } from '@/components/filters/ProductFilter';
import StockModal from '@/components/modal/StockModal';

export default function ProductPage() {
  const { filters, setFilters, loading, meta, items, fetchData } = useProductStore()

  const [hasOpenErrorModal, setOpenErrorModal] = useState(false);
  const [productData, setProductData] = useState<IProductResponse | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filtersModal, setFiltersMosdal] = useState(false);
  const [activeTab, setActiveTab] = useState('magic');
  const [isStockModalOpen, setStockModalOpen] = useState(false);

  //ABRIR MODAL DE ERROR
  const showErrors = (error: string) => {
    setErrorMessage(error);
    setOpenErrorModal(true);
  };

  // ABRIR MODAL DE DETALLES
  const showDetails = async (product: IProductResponse) => {
    try {
      const { _id } = product;
      // Primero activamos el modal (mostrará el estado de carga)
      setDetailsModalOpen(true);
      // Luego buscamos los datos
      const response: IProductResponse = await getProductById(_id);
      setProductData(response)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error al cargar los detalles");
      setOpenErrorModal(true);
      // Cerramos el modal de detalles en caso de error
      setDetailsModalOpen(false);
    }
  }


  // ABRIR MODAL DE HISTORIAL DE STOCK
  const showStockHistory = async (product: IProductResponse) => {
    try {
      const { _id } = product;
      setStockModalOpen(true); // Abre el modal
      const response: IProductResponse = await getProductById(_id); // Obtiene los datos del producto
      setProductData(response);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error al cargar el historial de stock");
      setOpenErrorModal(true);
      setStockModalOpen(false); // Cierra el modal en caso de error
    }
  };

  // Muestra el modal de detalles con la información de la carta
  const handleActions = (product: IProductResponse) => (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setDetailsModalOpen(true)} onClick={() => showDetails(product)}>Ver Detalles</DropdownMenuItem>
          {product.status === 'Error' && (
            <DropdownMenuItem
              onClick={() => showErrors('Error message')}
            >Ver Error</DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => showStockHistory(product)}>Historial de Stock</DropdownMenuItem> {/* Nueva opción */}
        </DropdownMenuContent>
      </DropdownMenu>
      {isDetailsModalOpen && productData && (
        <ProductModal
          data={productData}
          open={isDetailsModalOpen}
          onOpenChange={setDetailsModalOpen}
        />
      )}
      {isStockModalOpen && productData && (
        <StockModal
          data={productData}
          open={isStockModalOpen}
          onOpenChangeAction={setStockModalOpen}
        />
      )}
    </div>
  )


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
      lang: undefined // ⬅️ Asegúrate de usar `undefined` en lugar de `null`
    });
    onOpenChange(false)
  };
  // APPLICA LOS FILTROS Y CIERRA EL MODAL
  const handleApplyFilters = () => {
    onOpenChange(false); // Cierra el modal
  };

  // ABRE O CIERRA EL MODAL DE FILTROS
  const onOpenChange = (isOpen: boolean) => {
    setFiltersMosdal(isOpen);
  }

  // BUSCA CARTAS POR NOMBRE
  const handleSearchChange = useCallback(async (search: string) => {
    setFilters({ ...filters, search })
  }, [])
  const memoizedSearchBar = useMemo(() => <SearchBar initialSearchValue="" onSearchChangeAction={handleSearchChange} loading={loading} />,
    [handleSearchChange, loading],
  )

  // INICIALIZA EL RANGO DE FECHAS
  const initialDateRange: DateRange = {
    from: addDays(new Date(), -30),
    to: new Date(),
  }

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
      const products = await fetchAllProducts();
      const exportable = transformProductsForExport(products);
      exportToExcel(exportable, "Products");
    } catch (error) {
      console.error("Error exporting products:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Panel de Productos Jumpseller</h1>
          <DateRangeFilter onFilter={handleChangeDate} handleClearDate={handleClearDate} initialDateRange={initialDateRange} />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="magic">Magic4Ever</TabsTrigger>
            <TabsTrigger value="OnePiece">One Piece</TabsTrigger>
            <TabsTrigger value="pokemon">Pokemon</TabsTrigger>
          </TabsList>
          <TabsContent value="magic">
            <Card className="p-1">
              <CardContent>
                <div className="flex justify-between my-5" >
                  {memoizedSearchBar}
                  <div>
                    <Button className='mx-3' onClick={() => setFiltersMosdal(true)}>Filtrar Información</Button>
                    <Button onClick={handleExport}>Exportar Excel</Button>
                  </div>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center py-10">
                    <span>Cargando productos...</span>
                  </div>
                ) : (
                  <Table>
                    <ProductTableHeader />
                    <TableBody>
                      {(items.map((product) => (
                        <ProductTableRow
                          key={product._id}
                          item={product}
                          isSelected={false}
                          isExpanded={false}
                          onSelect={() => { }}
                          onExpand={() => { }}
                          handleActions={handleActions(product)}
                        />
                      ))
                      )}
                    </TableBody>
                  </Table>
                )}
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
      <ProductFilter
        open={filtersModal}
        onOpenChange={setFiltersMosdal}
        handleStateChange={handleStateChange}
        handleClearFilters={handleClearFilters}
        handleApplyFilters={handleApplyFilters}
      />

    </>
  )
}
