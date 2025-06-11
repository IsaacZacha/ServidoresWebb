import {user} from './models/user'
import { AppDataSource } from './data-source'
import { appendFile } from 'fs';
import { view } from './models/view';
import { isDataView } from 'util/types';

export const InsertarUsuario = async(
        Nombre: string,
        email: string
)=>{
    const user1 = new user();
    user1.correo = email
    user1.nombre = Nombre
    return await AppDataSource.manager.save(user1)
}


export const ConsulAll = async ()=>{

    return await AppDataSource.manager.find(user)

}

export const ConsultIndi = async (
    id: number
) => {

    return await AppDataSource.manager.findOne (user, {where: {id}})
}


export const Actualizar = async (
    id: number,
    nombre: string,
    correo: string

)=> {
    
    const UserActualizar = await ConsultIndi (id);
    
    if (UserActualizar){
    UserActualizar.correo = correo
    UserActualizar.nombre = nombre

    return await AppDataSource.manager.save(UserActualizar)
    }
    return null
}

export const Eliminar = async (

    id: number

)=>{
    
    const UserEliminar = await ConsultIndi (id)
    if (UserEliminar){
     
    return await AppDataSource.manager.remove(UserEliminar)    
    }
    return null
}


export const CrearVista = async (
    vista: string,
    UserId: number

) => {
    const UsuarioVis = await ConsultIndi (UserId)
    if (UsuarioVis){
        const NewVista = new view()
        NewVista.vista = vista
        NewVista.user = UsuarioVis

        return await AppDataSource.manager.save(NewVista)
    }
    return null
}

export const ElimnarVista = async (
    id: number


) => {

    const UserEliminar = await AppDataSource.manager.findOne(view, {where: {id}})
    if (UserEliminar){
        return await AppDataSource.manager.remove(UserEliminar)
    }
    return null
}
