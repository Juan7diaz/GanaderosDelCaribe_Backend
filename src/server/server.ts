import express from "express";
import cors from "cors";
import colors from "colors";
import AppDataSource from "../database/config";
import { animalRoutes, userRoutes } from "../routes"

class Server {
  port: string | undefined
  app: any

  constructor() {
    this.port = process.env.PORT || '8080';
    this.app = express()
    this.databaseInitialize()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.static("public"))
    this.app.use(express.json())
    this.app.use(cors({
      origin: 'http://localhost:5173',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }))
  }

  async databaseInitialize() {
    try{
      await AppDataSource.initialize()
      console.log(`${colors.green("[INFO]")} Base de datos inicializada correctamente!`)
    }catch(err){
      console.error(`${colors.red("[ERROR]")} Error al inicializar la base de datos!`)
      console.error(err)
    }
  }

  routes() {
    // aca se van a definir las rutas
    this.app.use('/api/animal', animalRoutes)
    this.app.use("/api/user", userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`${colors.green("[INFO]")} El servidor esta corriendo en el puerto: ${this.port}`)
      console.log(`${colors.green("[INFO]")} Si estas en local puede visitar: http://localhost:${this.port}`)
    })
  }

}

export default Server
