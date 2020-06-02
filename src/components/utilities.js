import domtoimage from 'dom-to-image';


/*
  Descarga en formato SVG graficos del sitio web
  Parametro -> id -> Identificador del grafico a descargar
*/
export function descargarImagen(id) {
  domtoimage.toSvg(document.getElementsByClassName(id)[0]).then(function(dataUrl) {
    var link = document.createElement('a');
    link.download = id + '.svg';
    link.href = dataUrl;
    link.click();
  });

}

/*
  Obtiene los años disponibles en la base de datos por medio de una consulta al API
  Parametro -> enlace -> Url del api correspondiente a la consulta que retorna los años
*/
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
