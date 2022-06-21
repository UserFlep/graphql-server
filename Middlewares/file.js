import 'dotenv/config'
import {join, parse} from "path";
import fs from "fs";
import {finished} from "stream/promises"
import  { resolve  } from 'path';
import { exiftool} from 'exiftool-vendored'; //работает идеально
import mimeType from "whatwg-mimetype"

//вариант по-лучше https://observablehq.com/@radames/hello-mediainfo-js-mediainfolib-on-browser
// демо https://mediainfo.js.org/
//Возможно лучше получать метаинформацию на стороне клиента

export const singleReadFile = async (file) => {
    try {

        const {createReadStream, filename, mimetype} = await file; //file.promise
        const destructedMimetype = mimeType.parse(mimetype)
        const stream = await createReadStream();
        const {ext} = parse(filename);
        const name = `${Math.floor((Math.random() * 10000) + 1)}-${Date.now()}${ext}`;
        let url = join(resolve("Upload"), name);
        const imageStream = await fs.createWriteStream(url)
        await stream.pipe(imageStream)
        await finished(imageStream);
        const baseUrl = process.env.BASE_URL
        const port = process.env.PORT

        //Работает идеально
        const metadata = await exiftool.read(url);
        const {ImageSize, FileSize} = metadata;

        url = `${baseUrl}${port}/${name}`;
        return {
            url,
            mimetype,
            type: destructedMimetype.type.toUpperCase(),
            subtype: destructedMimetype.subtype.toUpperCase(),
            imageSize: ImageSize,
            fileSize: FileSize
        };
    }
    catch (e){
        console.log("Error on Middlewares/file.js", e.message)
    }
    finally {
        //await exiftool.end() //из-за этого вылетают ошибки
    }
} // This is single readfile

export const multipleReadFile = async (files) => {
    let filesData = [];
    for (let i = 0; i < files.length; i++) {
        filesData.push(await singleReadFile(files[i]))
    }
    return filesData
}
