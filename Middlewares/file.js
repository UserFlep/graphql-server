import {join, parse} from "path";
import {createWriteStream} from "fs";
import 'dotenv/config'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const readFile = async (file) => {
    const {createReadStream, filename} = await file.file;
    const stream = createReadStream();
    let {ext, name} = parse(filename);
    name = `${Math.floor((Math.random() * 10000) + 1)}`;
    let url = join(__dirname, `../Upload/${name}-${Date.now()}${ext}`);
    const imageStream = await createWriteStream(url)
    await stream.pipe(imageStream);
    const baseUrl = process.env.BASE_URL
    const port = process.env.PORT
    url = `${baseUrl}${port}${url.split('Upload')[1]}`;
    return url;
} // This is single readfile

export const multipleReadFile = async (files) => {
    let fileUrls = [];
    for (let i = 0; i < files.length; i++) {
        fileUrls.push(await readFile(files[i]))
    }
    return fileUrls
}
