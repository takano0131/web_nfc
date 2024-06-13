document.getElementById('read-button').addEventListener('click', async () => {
  try {
      const ndef = new NDEFReader();
      await ndef.scan();
      
      ndef.onreading = event => {
          const message = event.message;
          let output = '';

          for (const record of message.records) {
              const textDecoder = new TextDecoder(record.encoding);
              output += `Record type: ${record.recordType}\n`;
              output += `MIME type: ${record.mediaType}\n`;
              output += `Data: ${textDecoder.decode(record.data)}\n\n`;
          }

          document.getElementById('output').textContent = output;
      };

      ndef.onreadingerror = () => {
          document.getElementById('output').textContent = '読み取りエラーが発生しました。';
      };
  } catch (error) {
      document.getElementById('output').textContent = `エラー: ${error.message}`;
  }
});
