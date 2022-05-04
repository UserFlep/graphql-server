import {join, parse} from "path";
import {createWriteStream} from "fs";
import 'dotenv/config'
import { resolve  } from 'path';


export const readFile = async (file) => {
    const {createReadStream, filename, mimetype} = await file.promise;
    const stream = createReadStream();
    let {ext, name} = parse(filename);
    name = `${Math.floor((Math.random() * 10000) + 1)}-${Date.now()}${ext}`;
    let url = join(resolve("Upload"), name);
    console.log(url)
    const imageStream = await createWriteStream(url)
    await stream.pipe(imageStream);
    const baseUrl = process.env.BASE_URL
    const port = process.env.PORT
    url = `${baseUrl}${port}/${name}`;

    return {url, mimetype};
} // This is single readfile

export const multipleReadFile = async (files) => {
    let filesData = [];
    for (let i = 0; i < files.length; i++) {
        filesData.push(await readFile(files[i]))
    }
    return filesData
}
