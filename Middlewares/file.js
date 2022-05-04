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
    console.log(ext, name)
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
    let fileUrl = [];
    for (let i = 0; i < files.length; i++) {
        fileUrl.push(await readFile(files[i]))
        // const {createReadStream, filename} = await files[i].file;
        // const stream = createReadStream();
        // let {ext, name} = parse(filename);
        // name = `single${Math.floor((Math.random() * 10000) + 1)}`;
        // let url = join(__dirname, `../Upload/${name}-${Date.now()}${ext}`);
        // const imageStream = await createWriteStream(url)
        // await stream.pipe(imageStream);
        // const baseUrl = process.env.BASE_URL
        // const port = process.env.PORT
        // url = `${baseUrl}${port}${url.split('Upload')[1]}`;
        // fileUrl.push(url);
    }
    return fileUrl
}
