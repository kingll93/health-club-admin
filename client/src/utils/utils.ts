// blob转json
export function blob2json(data: Blob) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.readAsText(data, 'utf-8');
      reader.onload = () => {
        let parseObj = JSON.parse(reader.result as string);
        resolve(parseObj);
      };
      reader.onerror = () => {
        reject('download failed');
      };
    });
  }