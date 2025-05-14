import { InsertarUsuario, ConsulAll, ConsultIndi, Actualizar, Eliminar, CrearVista, ElimnarVista } from './crud';
import { iniciar } from './database';

async function main() {
    await iniciar();

    const newUser = await InsertarUsuario("Isaac", "IsaacZachararias@gmail.com");
    console.log("ID del nuevo usuario:", newUser.id)

    const Vista = await CrearVista ("Vista de producto", newUser.id);
    console.log (Vista)

    const VistaEliminada = ElimnarVista (Vista!.id);
    console.log(VistaEliminada)

    const users = await ConsulAll();
    console.log("Consulta General De Usuario", users)

    const userOne = await ConsultIndi (newUser.id);
    console.log("Consulta Individual De Usuario", userOne)

    const UserUpdate = await Actualizar (newUser.id, "Juan", "Castro");
    console.log("Usuario Actualizado", UserUpdate)

    const UserDelete = await Eliminar (newUser.id);
    console.log("Usuario Eliminado", UserDelete)

}

main();

