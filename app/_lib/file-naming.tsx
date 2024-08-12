function recoverFileName(file: File) {
  return Buffer.from(file.name, 'latin1').toString('utf-8');
}

function removeFileExt(file: string) {
  return file.split('.').slice(0, -1).join('.');
}

export { recoverFileName, removeFileExt };
