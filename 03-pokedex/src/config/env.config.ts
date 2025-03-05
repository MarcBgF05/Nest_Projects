//Mapeamos variables de entorno a un objeto.
//Se debe cargar en el módulo de la aplicación, con el método forRoot() y paráemtro load
export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3005,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
});
