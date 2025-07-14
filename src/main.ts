import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { send } from "process"


const start = async () => {
    try {
        const PORT = 5460
    
        const app = await NestFactory.create(AppModule)
        const cors = require('cors');
        app.enableCors()
        app.use(cors());
        await app.listen(PORT, () => console.log(`Server has been started on PORT - ${PORT}`))
        
    } catch (error) {
        console.log(error)
    }
}
start()
