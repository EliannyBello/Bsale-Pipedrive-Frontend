'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "@/components/UserForm";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { UsersResponse } from "@/app/api/users/user.interface";
import { getUserId, updateUser } from "@/app/api/users/users.api";


const UserSettingsPage = () => {
    const [user, setUser] = useState<UsersResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session, status } = useSession();


    const fetchUser = async (_id: string) => {
        setIsLoading(true);
        try {
            const data = await getUserId(_id);
            setUser(data);
        } catch (error) {
            console.error("Error al obtener usuario:", error);
            toast.error("Error al obtener usuario. Por favor, inicie sesión nuevamente.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpdateUser = async (updatedUser: UsersResponse) => {
        if (!updatedUser._id) {
            toast.error("Error: No se puede actualizar sin ID.");
            return;
        }
        try {
            await updateUser(updatedUser);
            toast.success("Perfil actualizado exitosamente");
            await fetchUser(updatedUser._id);
        } catch (error) {
            console.error("Error al actualizar usuario", error);
            toast.error("Error al actualizar perfil");
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            fetchUser(session.user.id);
            console.log('bandera::!', session?.user);
        }

    }, [status]);

    return (
        <div className="m-4">
            <Tabs value="usuarios">
                <TabsList>
                    <TabsTrigger value="usuarios">Configuración de Cuenta</TabsTrigger>
                </TabsList>
                <TabsContent value="usuarios">
                    <Card>
                        <div className="m-3">
                            <CardHeader>
                                <CardTitle>Configuración de Perfil</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    
                                ) : user ? (
                                    <UserForm onSubmitAction={handleUpdateUser} user={user} />
                                ) : (
                                    <p>No se encontró la información del usuario.</p>
                                )}
                            </CardContent>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

    );
};

export default UserSettingsPage;
