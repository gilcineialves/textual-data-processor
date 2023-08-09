import path from "node:path";
import DataProcessor from "./src/data-processing/DataProcessor";
const dataPath = path.join(__dirname, 'src/data')

interface IDataProcessor { 
    nome: string;
    cpf: string;
    dataNascimento: string;
}

try {
    const dataProcessor = new DataProcessor(dataPath)
    const data = dataProcessor.processFiles() as unknown as IDataProcessor[]
    console.log(data)
} catch (error) {
    console.log(error)
}