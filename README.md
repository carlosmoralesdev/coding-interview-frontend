Distribucion de carpetas:

-En la carpeta "app" se encuentra la parte principal del Proyecto construido en Next. Se divide en 2 carpetas:
--(frontend): Contiene todos los componentes y pages del Proyecto, asi como hooks y estilos.
--api: La carpeta api contiene todos los endpoints que necesitan ser consumidos por la aplicacion. Estos endpoints estan asociados a diferentes casos de uso y servicios. Se estan ejecutando del lado del servidor, por lo que en terminos de seguridad, las urls de api externas no son publicas. 

-Carpeta "application":
La sub-carpeta services: Contiene las interfaces para servicios externos o apis de terceros.
La sub-carpeta use-cases: Implementacion concreta de cada caso de uso (Por ejemplo, calcular tasa de conversion / rate).

-Carpeta "entities": Contiene los modelos/tipos/dominio de la aplicacion, tanto para los codigos de errores como para el resto de tipos usados en la aplicacion.

-Carpeta "infrastructure": Se refiere a las implementaciones tecnicas para repositorios y servicios, tomando como base el molde/estructuras/tipos establecidos en la carpeta "application".

-Carpeta "interface-adapters": Actúa como una capa intermedia entre la infraestructura y el frontend. Aqui van Dtos y transformacion de datos.

-Test: Carpeta donde se almacenaran las pruebas unitarias.

-Utils: Funciones de utilidad y que pueden ser compartidas entre otras carpetas.