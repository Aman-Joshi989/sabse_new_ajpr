const { put } = require('@vercel/blob');
process.env.BLOB_READ_WRITE_TOKEN = "vercel_blob_rw_eIWoDF6x7FZpwZwi_rg73ZKo7pwLNYowDo2eOUwiRRiZMj4";
put('test.txt', 'Hello World', { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN })
  .then(console.log)
  .catch(console.error);
