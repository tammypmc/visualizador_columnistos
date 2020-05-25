import React from 'react';
import domtoimage from 'dom-to-image';
import {saveAs} from 'file-saver';

export function descargarImagen(id) {
  /*  domtoimage.toPng(document.getElementsByClassName(id)[0], { bgcolor: 'white' })
  .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = id+'.png';
      link.href = dataUrl;
      link.click();
  });*/

  domtoimage.toSvg(document.getElementsByClassName(id)[0]).then(function(dataUrl) {
    var link = document.createElement('a');
    link.download = id + '.svg';
    link.href = dataUrl;
    link.click();
  });

}

export function ObtenerAnios(enlace) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', enlace, false);
  httpRequest.send();
  var cons = JSON.parse(httpRequest.response);
  var listaAnios = [];
  for (var i = 0; i < cons.data.length; i++) {
    listaAnios.push(cons.data[i].anios);
  }

  return listaAnios;
}
