import { FileType } from '@/features/file-overview/types';
import axios from 'axios';

import {
    completeMultipartUpload,
    generatePartUrl,
    initiateMultipartUpload,
} from '@/lib/api';
import { MultipartUploadPart } from '@/lib/types';

async function uploadPart(
    url: string,
    fileChunk: Blob,
    partNumber: number,
    filename: string,
): Promise<MultipartUploadPart> {
    const response = await axios.put(url, fileChunk, {
        headers: { 'Content-Type': fileChunk.type },
        //   onUploadProgress: (e) => {
        //     if (e.lengthComputable) {
        //       setProgress((prev) => ({
        //         ...prev,
        //         [filename]: (prev[filename] || 0) + (e.loaded / e.total) * (100 / Math.ceil(fileChunk.size / (5 * 1024 * 1024))),
        //       }));
        //     }
        //   },
    });

    return { ETag: response.headers.etag, PartNumber: partNumber };
}

export async function uploadFile(
    apiKey: string,
    file: File,
    fileType: FileType,
) {
    const chunkSize = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    const dbFile = await initiateMultipartUpload({
        apiKey,
        contentType: file.type,
        filename: file.name,
        fileSize: file.size,
        fileType: fileType, // TODO: Remove this
    });
    const fileId = dbFile.id;
    const objectKey = dbFile.objectKey;
    const uploadedParts: MultipartUploadPart[] = [];

    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const fileChunk = file.slice(start, end);

        const url = await generatePartUrl({
            apiKey,
            objectKey,
            partNumber: i + 1,
        });
        const uploadedPart = await uploadPart(url, fileChunk, i + 1, file.name);
        uploadedParts.push(uploadedPart);
    }

    await completeMultipartUpload({ apiKey, objectKey, parts: uploadedParts });
    return fileId;
}
