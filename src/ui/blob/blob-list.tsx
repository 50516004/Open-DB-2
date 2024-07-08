import { list } from '@vercel/blob';

export async function BlobList() {

  async function getList() {
    return await list();
  }

  const blobList = await getList();

  return (
    <section>
      <ol>
        {await Promise.all(
          blobList.blobs.map(async (blob, i) => {
            const response = await fetch(blob.url);
            console.log(blob.url);
            return (<li key={i}>{response.text()}</li>)
          })
        )}
      </ol>
    </section>
  );
}