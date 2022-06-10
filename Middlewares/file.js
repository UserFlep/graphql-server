import 'dotenv/config'
import {join, parse} from "path";
import {createWriteStream} from "fs";
import {finished} from "stream/promises"
import  { resolve  } from 'path';
import { exiftool} from 'exiftool-vendored'; //работает идеально

export const singleReadFile = async (file) => {
    try {
        const {createReadStream, filename, mimetype} = await file; //file.promise
        const stream = await createReadStream();

        const {ext} = parse(filename);
        const name = `${Math.floor((Math.random() * 10000) + 1)}-${Date.now()}${ext}`;
        let url = join(resolve("Upload"), name);
        const imageStream = await createWriteStream(url)
        await stream.pipe(imageStream)
        await finished(imageStream);
        const baseUrl = process.env.BASE_URL
        const port = process.env.PORT

        //Работает идеально
        const metadata = await exiftool.read(url);
        const {ImageSize, FileSize} = metadata;
        console.log(metadata);

        url = `${baseUrl}${port}/${name}`;

        return {url, mimetype, ImageSize, FileSize};
    }
    catch (e){
        console.log("Error on Middlewares/file.js", e.message)
    }
    finally {
        await exiftool.end()
    }
} // This is single readfile

export const multipleReadFile = async (files) => {
    let filesData = [];
    for (let i = 0; i < files.length; i++) {
        filesData.push(await singleReadFile(files[i]))
    }
    return filesData
}


//import probe from 'probe-image-size'


// export const getFileInfo = async (createReadStream) =>{
//
//     const {width, height} = await probe(createReadStream()).catch(e=>console.log("Error",e));
//
//     return new Promise((resolves, rejects) => {
//         let filesize = 0;
//         let stream = createReadStream();
//         stream.on('data', (chunk) => {
//             filesize += chunk.length;
//         });
//
//         stream.on('end', () =>{
//             resolves({filesize, width, height})}
//         );
//         stream.on('error', rejects);
//     });
// }

//Получение данных о картинке
//const {filesize, width, height} = await getFileInfo(createReadStream).catch(e=>console.log(e))