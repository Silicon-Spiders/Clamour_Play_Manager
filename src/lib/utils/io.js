/*
 * Extract all content from a FormData File into a Uint8Array
 */
export async function extractFileContent(file) {
    // allocate the result array to the length of the file
    const result = new Uint8Array(file.size);
    // returns a Promise that resolves to the total content of the file
    return new Promise(async (resolve, reject) => {
      try {
        const reader = file.stream().getReader();
        let offset = 0;
        for (; ;) {
          const { value, done } = await reader.read();
          if (value) {
            result.set(value, offset);
            offset += value.length;
          }
          if (done) break;
        }
        // resolve to the total content of the file
        resolve(result);
      } catch (e) {
        // reject in case of error
        reject(e);
      }
    });
  }