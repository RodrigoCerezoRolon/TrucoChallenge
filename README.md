# Desafío Técnico Truco - README

Este proyecto del Desafío Técnico Truco fue desarrollado utilizando diversas tecnologías y herramientas. Aquí encontrarás las instrucciones para configurar el entorno de desarrollo y ejecutar la aplicación.

## Configuración del Entorno

### Requisitos

Asegúrate de tener instalados los siguientes componentes antes de iniciar el proyecto:

- [Xampp](https://www.apachefriends.org/index.html) - Un paquete que incluye Apache, MySQL, PHP y phpMyAdmin.
- [PostgreSQL](https://www.postgresql.org/download/) - Sistema de gestión de bases de datos relacional.
- [Composer](https://getcomposer.org/) - Herramienta de administración de dependencias para PHP.
- [Node.js y npm](https://nodejs.org/) - Entorno de ejecución para JavaScript y su gestor de paquetes.

### Pasos de Instalación

1. **Descarga o clona el Repositorio:**

    ```bash
    git clone https://github.com/RodrigoCerezoRolon/TrucoChallenge
    ```

2. **Configura el Entorno:**

    - Copia el archivo `.env.example` a `.env` y ajusta las configuraciones de la base de datos.

3. **Instala las Dependencias de PHP:**

    ```bash
    composer install
    ```

4. **Genera la Clave de JWT, Corre las migraciones y Seeders:**

    ```bash
    php artisan jwt:secret
    php artisan migrate
    php artisan db:seed
    ```

5. **Instala las Dependencias de Node.js:**

    ```bash
    npm install
    ```

6. **Compila los Recursos Frontend:**

    ```bash
    npm run dev
    ```

## Ejecución del Proyecto

Una vez que hayas configurado el entorno, puedes iniciar el proyecto:

```bash
php artisan serve
```

Visita [http://localhost:8000](http://localhost:8000) en tu navegador para ver la aplicación.

¡Listo! Ahora la aplicación Truco debería estar ejecutándose en tu entorno local.

## Tecnologías Utilizadas

- **Laravel:** Framework de PHP elegido por experiencia previa con el framework.
- **PostgreSQL:** Base de datos relacional utilizada para almacenar los datos de la aplicación.
- **React:** Biblioteca de JavaScript utilizada para construir la interfaz de usuario.
- **Swagger:** Herramienta para documentar la API REST.
- **Vite:** Build tool para el frontend integrado con Laravel.
