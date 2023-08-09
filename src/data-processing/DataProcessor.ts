import fs from 'node:fs';
import path from 'node:path';
interface IDataProcessor {
    processFiles(): { [key: string]: string }[];
}

class DataProcessor implements IDataProcessor {
    constructor(private dataPath: string) { }
    processFiles(): { [key: string]: string }[] {
        const dataFiles = this.getDataFiles()
        const result: { [key: string]: string }[] = []
        for (const file of dataFiles) {
            const fileContents = this.readFileContents(file);
            const parsedData = this.parseData(fileContents);
            for (const item of parsedData) {
                const data = item
                    .toString()
                    .replace(/,/g, '\n')
                    .split('\n')
                    .map(item => item.split(': '))
                const dataObject = this.createDataObject(data)
                result.push(dataObject)
            }
        }
        return result
    }
    private getDataFiles(): string[] {
        const files = fs.readdirSync(this.dataPath)
        return files.filter(file => file.endsWith('.txt'))
    }
    private readFileContents(filename: string): string {
        const filePath = path.join(this.dataPath, filename)
        return fs.readFileSync(filePath, 'utf-8');
    }
    private parseData(data: string): string[][] {
        const processedData = data
            .split('\r\n')
            .map(item => item.split('\t')
                .toString()
                .split(': ').toString()
                .split(', ')
                .map(item => item.replace(',', ': '))
                .filter(item => item !== ''))
            .filter(item => item.length > 0)
        return processedData
    }
    private createDataObject(data: string[][]): { [key: string]: string } {
        const dataObject: { [key: string]: string } = {}
        for (const [key, value] of data) {
            dataObject[key] = value
        }
        return dataObject
    }
}

export default DataProcessor;