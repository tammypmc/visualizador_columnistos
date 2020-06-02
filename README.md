# Visualizador Columnistos
Este proyecto fue creado con el fin de mostrar de una manera mas dinámica la información recopilada a lo largo de los años del proyecto Columnistos. Fue desarrollado de manera que pueda ser utilizado por cualquier instancia del proyecto en otro país. **Ver prerequisitos**

## ¿Cómo replicar este proyecto?

### Prerequisitos

- Debe tener su propia instancia del proyecto Columnistos, para esto diríjase al siguiente repositorio: [https://github.com/columnistos/columnistos](https://github.com/columnistos/columnistos) . Aquí encontrará informacián de como ejecutar los scripts que generan los datos y el bot de twitter.

- Debe tener en funcionamiento el API del proyecto Columnistos que encontrará en [https://github.com/samsaurio/ConsultasAPI](https://github.com/samsaurio/ConsultasAPI). 


### Instalación

#### Instalación de requerimientos.

```npm install```

#### Variables de configuración.
Para adaptar este proyecto a otro país será necesario editar el archivo .env modificando las siguientes variables:

- ```REACT_APP_COUNTRY```: Nombre de país con la inicial en mayúscula.
  - Ejemplo : ```REACT_APP_COUNTRY = Paraguay```
  
- ```REACT_APP_MEDIOS```: Lista de medios consultados por el proyecto. Estos deben estar con sus iniciales en mayúscula y separados por comas.
  - Ejemplo : ```REACT_APP_MEDIOS = ABC Color,La Nación,Última Hora```

- ```REACT_APP_MEDIOS_BD_NAMES```: Lista con los nombres de los medios tal y como aparecen en la base de datos del proyecto. Deben ser nombrados en el mismo orden que en la varible REACT_APP_MEDIOS. Deben estar separados por comas.
  - Ejemplo : ```REACT_APP_MEDIOS_BD_NAMES = abc,lanacionpy,ultimahora```
  
- ```REACT_APP_API_URL```: Url del API correspondiente al país. 
  - Ejemplo : ```REACT_APP_COUNTRY = https://apicolumnistos.tedic.net/```


#### Ejecutar el sitio web de manera local.

```npm start```

