import { AppDataSource } from "./data-source";
import "reflect-metadata";

export const iniciar = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Base de datos iniciada correctamente");
    return AppDataSource;
  } catch (error) {
    console.error("❌ Error al iniciar la base de datos");
    throw error;
  }
};
