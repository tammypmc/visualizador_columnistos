# Visualizador Columnistos
Este proyecto fue creado con el fin de mostrar de una manera mas dinámica la información recopilada a lo largo de los años del proyecto Columnistos. Fue desarrollado de manera que pueda ser utilizado por cualquier instancia del proyecto en otro país. **Ver prerequisitos**

## ¿Cómo replicar este proyecto?

### Prerequisitos

- Debe tener su propia instancia del proyecto Columnistos, para esto diríjase al siguiente repositorio: [https://github.com/columnistos/columnistos](https://github.com/columnistos/columnistos). Aquí encontrará información de como ejecutar:  
1. Los scripts que generan los datos.  
2. El bot de twitter.  
3. El API.  

### Instalación  - variables

Para adaptar este proyecto a otro país será necesario editar el archivo .env modificando las siguientes variables:

- ```REACT_APP_COUNTRY```: Nombre de país con la inicial en mayúscula.
  - Ejemplo : ```REACT_APP_COUNTRY = Paraguay```
  
- ```REACT_APP_MEDIOS```: Lista de medios consultados por el proyecto. Estos deben estar con sus iniciales en mayúscula y separados por comas.
  - Ejemplo : ```REACT_APP_MEDIOS = ABC Color,La Nación,Última Hora```

- ```REACT_APP_MEDIOS_BD_NAMES```: Lista con los nombres de los medios tal y como aparecen en la base de datos del proyecto. Deben ser nombrados en el mismo orden que en la varible REACT_APP_MEDIOS. Deben estar separados por comas.
  - Ejemplo : ```REACT_APP_MEDIOS_BD_NAMES = abc,lanacionpy,ultimahora```
  
- ```REACT_APP_API_URL```: Url del API correspondiente al país. 
  - Ejemplo : ```REACT_APP_API_URL = https://apicolumnistos.tedic.net/```

Hay dos formas de instalar:

### Instalación con npm

```npm install```

#### Ejecutar el sitio web en modo desarrollo.

```npm start```

El sitio web corre en el puerto 3000

#### Compilación del sitio web para producción.

```npm run build```

### Instalación con docker

Revisar la configuración de red de docker-compose.yml y luego correr:

```docker-compose up -d```
