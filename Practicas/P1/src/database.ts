import { AppDataSource } from './data-source'
import 'reflect-metadata'

export const iniciar = async () => { 
    try{
        await AppDataSource.initialize()
        console.log ("Base de datos iniciada")
        return AppDataSource;
    }
    catch(ex){
        console.log("Inicio Fallido")
        throw(ex)

    }

}