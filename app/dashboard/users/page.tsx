'use client'
import React, { useEffect, useState } from 'react';
import { UsersResponse } from "@/app/api/users/user.interface";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserForm from "@/components/UserForm";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Table, TableBody } from "@/components/ui/table";
import { UserTableRow } from '@/components/table/rows/UserTableRow';
import { UserTableHeader } from '@/components/table/headers/UserTableHeader';
import { MoreHorizontal } from 'lucide-react';
import { usersStore } from '@/app/store/userStore';
import { createUser, deleteUser, updateUser } from '@/app/api/users/users.api';
import { TablePagination } from '@/components/table/TablePagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export default function UsersPage() {

    const { filters, setFilters, loading, meta, items, fetchData } = usersStore();
    const [open, setOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<UsersResponse | null>(null)
    const [deletingUser, setDeletingUser] = useState<UsersResponse | null>(null)


    const handleCreateUser = async (newUser: UsersResponse) => {
        try {
            await createUser(newUser);
            setIsCreateDialogOpen(false)
            toast.success('Usuario creado exitosamente')
            await fetchData();
        } catch (error) {
            console.error('error al crear usuario', error)
            toast.error('Error al crear usuario')
        }
    }
    const handleUpdateUser = async (updatedUser: UsersResponse) => {
        try {
            await updateUser(updatedUser)
            setEditingUser(null)
            toast.success('Usuario actualizado exitosamente')
            await fetchData();
        } catch (error) {
            console.error('error al actualizar usuario', error)
            toast.error('Error al actualizar usuario')
        }
    }

    const openConfirmationDialog = (user: UsersResponse) => {
        setDeletingUser(user)
        setOpen(true)
    }

    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id)
            toast.success('Usuario eliminado exitosamente')
            await fetchData();
        } catch (error) {
            console.error('error al eliminar usuario', error)
            toast.error('Error al eliminar usuario')
        } finally {
            setOpen(false)
        }
    }

    const handleActions = (user: UsersResponse) => (
        <div className="flex space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingUser(user)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => openConfirmationDialog(user)}
                    >Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {editingUser && (
                <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Usuario</DialogTitle>
                        </DialogHeader>
                        <UserForm user={editingUser} onSubmitAction={handleUpdateUser} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )


    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page })
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="space-y-4 p-8 pt-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                <div className="mb-4">
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setIsCreateDialogOpen(true)}>Crear Usuario</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                            </DialogHeader>
                            <UserForm onSubmitAction={handleCreateUser} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <Card className='my-3'>
                <CardContent className='m-3'>
                    {loading ? :
                        <Table>
                            <UserTableHeader />
                            <TableBody>
                                {(items.map((user, index) => (
                                    <UserTableRow
                                        key={user._id || `user-${index}`}
                                        item={user}
                                        isSelected={false}
                                        isExpanded={false}
                                        onSelect={() => { }}
                                        onExpand={() => { }}
                                        handleActions={handleActions(user)}
                                    />
                                ))
                                )}
                            </TableBody>
                        </Table>
                    }
                    <div className='mt-5'>
                        <TablePagination meta={meta} onPageChange={handlePageChange} />
                    </div>
                </CardContent>
            </Card>
            <ConfirmationDialog
                open={open}
                onOpenChange={setOpen}
                title="¿Estas seguro de eliminar este usuario?"
                description="Esta acción no se puede deshacer."
                confirmButton={{
                    label: "Eliminar",
                    onClick: () => deletingUser && handleDeleteUser(deletingUser._id ?? ''),
                    variant: "destructive",
                }}
                cancelButton={{
                    label: "Cancelar",
                    variant: "secondary",
                }}
            />
        </div>
    );
}