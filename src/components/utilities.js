import React from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export function descargarImagen(id){
/*  domtoimage.toPng(document.getElementsByClassName(id)[0], { bgcolor: 'white' })
  .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = id+'.png';
      link.href = dataUrl;
      link.click();
  });*/

  domtoimage.toSvg(document.getElementsByClassName(id)[0])
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = id+'.svg';
    link.href = dataUrl;
    link.click();
  });
}
