import 'dotenv/config'
import {join, parse} from "path";
import {createWriteStream,statSync} from "fs";
import path, { resolve  } from 'path';
import exifr from "exifr";
import wavFileInfo from "wav-file-info"
import { getFileProperties} from 'get-file-properties'
import probe from 'probe-image-size'
import imageInfo from "image-info"

export const getFileInfo = async (createReadStream) =>{

    const {width, height} = await probe(createReadStream()).catch(e=>console.log("Error",e));

    return new Promise((resolves, rejects) => {
        let filesize = 0;
        let stream = createReadStream();
        stream.on('data', (chunk) => {
            filesize += chunk.length;
        });

        stream.on('end', () =>{
            resolves({filesize, width, height})}
        );
        stream.on('error', rejects);
    });
}



export const singleReadFile = async (file) => {

    const {createReadStream, filename, mimetype} = await file; //file.promise

    //Подсчет file-size
    const {filesize, width, height} = await getFileInfo(createReadStream).catch(e=>console.log(e))

    const stream = createReadStream();
    const {ext} = parse(filename);
    const name = `${Math.floor((Math.random() * 10000) + 1)}-${Date.now()}${ext}`;
    let url = join(resolve("Upload"), name);
    const imageStream = await createWriteStream(url)
    await stream.pipe(imageStream)
    const baseUrl = process.env.BASE_URL
    const port = process.env.PORT

    url = `${baseUrl}${port}/${name}`;

    return {url, mimetype, filesize, width, height};
} // This is single readfile

export const multipleReadFile = async (files) => {
    let filesData = [];
    for (let i = 0; i < files.length; i++) {
        filesData.push(await singleReadFile(files[i]))
    }
    return filesData
}
