import { list } from '@vercel/blob';

export async function BlobList() {

  const blobList = await list();

  return (
    <ol>
      {await Promise.all(
        blobList.blobs.map(async (blob, i) => {
          const response = await fetch(blob.url);
          return (
            <li key={i}>
              {response.text()}
            </li>
          );
        })
      )}
    </ol>
  );
}