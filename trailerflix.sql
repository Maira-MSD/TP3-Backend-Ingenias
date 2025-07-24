/* Delimitador cambiado a ; */
/* Conectando a 127.0.0.1 por MariaDB or MySQL (TCP/IP), usuario root, usando contraseña: Yes ... */
SELECT CONNECTION_ID();
SHOW VARIABLES;
/* Changing character set from utf8mb4 to utf8mb4 */
/* Juego de caracteres: utf8mb4 */
SHOW /*!50002 GLOBAL */ STATUS;
SELECT NOW();
/* Conectado. ID de Hilo: 10 */
/* Reading function definitions from C:\Users\Yesi\Downloads\HeidiSQL_12.11_64_Portable\functions-mysql8.ini */
SHOW TABLES FROM `information_schema`;
SHOW DATABASES;
SHOW OPEN TABLES FROM trailerflix WHERE `in_use`!=0;
USE `trailerflix`;
/* Entrando a la sesión "Unnamed" */
SELECT `DEFAULT_COLLATION_NAME` FROM `information_schema`.`SCHEMATA` WHERE `SCHEMA_NAME`='trailerflix';
SHOW TABLE STATUS FROM `trailerflix`;
SHOW FUNCTION STATUS WHERE `Db`='trailerflix';
SHOW PROCEDURE STATUS WHERE `Db`='trailerflix';
SHOW TRIGGERS FROM `trailerflix`;
SELECT *, EVENT_SCHEMA AS `Db`, EVENT_NAME AS `Name` FROM information_schema.`EVENTS` WHERE `EVENT_SCHEMA`='trailerflix';
/* Cargando archivo "C:\Users\Yesi\Downloads\HeidiSQL_12.11_64_Portable\Backups\query-tab-2025-07-23_16-31-12-882.sql" (362 B) en pestaña de consulta #1 */
/* Cargando archivo "C:\Users\Yesi\Downloads\HeidiSQL_12.11_64_Portable\Backups\query-tab-2025-07-24_13-58-05-278.sql" (129 B) en pestaña de consulta #2 */
/*  Escalando controles a DPI de pantalla: 100% */
SHOW ENGINES;
SHOW COLLATION;
SHOW CHARSET;
SELECT 'trailerflix' AS `Database`, 'actores' AS `Table`, 36 AS `Rows`, 0 AS `Duration`;
/*!40101 SET @OLD_LOCAL_SQL_MODE=@@SQL_MODE, SQL_MODE='' */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
SELECT 'trailerflix' AS `Database`, 'categoria' AS `Table`, 2 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido' AS `Table`, 97 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido_tag' AS `Table`, 307 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'genero' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'ranking' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'reparto' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'tag' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'trabajos_filmicos' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
/*!40101 SET SQL_MODE=IFNULL(@OLD_LOCAL_SQL_MODE, '') */;
/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
SELECT 'trailerflix' AS `Database`, 'actores' AS `Table`, 36 AS `Rows`, 0 AS `Duration`;
/*!40101 SET @OLD_LOCAL_SQL_MODE=@@SQL_MODE, SQL_MODE='' */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
SELECT 'trailerflix' AS `Database`, 'categoria' AS `Table`, 2 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido' AS `Table`, 97 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido_tag' AS `Table`, 307 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'genero' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'ranking' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'reparto' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'tag' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'trabajos_filmicos' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
/*!40101 SET SQL_MODE=IFNULL(@OLD_LOCAL_SQL_MODE, '') */;
/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
SELECT 'trailerflix' AS `Database`, 'actores' AS `Table`, 36 AS `Rows`, 0 AS `Duration`;
/*!40101 SET @OLD_LOCAL_SQL_MODE=@@SQL_MODE, SQL_MODE='' */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
SELECT 'trailerflix' AS `Database`, 'categoria' AS `Table`, 2 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido' AS `Table`, 97 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido_tag' AS `Table`, 307 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'genero' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'ranking' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'reparto' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'tag' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'trabajos_filmicos' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
/*!40101 SET SQL_MODE=IFNULL(@OLD_LOCAL_SQL_MODE, '') */;
/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
SELECT 'trailerflix' AS `Database`, 'actores' AS `Table`, 36 AS `Rows`, 0 AS `Duration`;
/*!40101 SET @OLD_LOCAL_SQL_MODE=@@SQL_MODE, SQL_MODE='' */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
SELECT 'trailerflix' AS `Database`, 'categoria' AS `Table`, 2 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido' AS `Table`, 97 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'contenido_tag' AS `Table`, 307 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'genero' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'ranking' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'reparto' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'tag' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
SELECT 'trailerflix' AS `Database`, 'trabajos_filmicos' AS `Table`, 0 AS `Rows`, 0 AS `Duration`;
/*!40101 SET SQL_MODE=IFNULL(@OLD_LOCAL_SQL_MODE, '') */;
/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;

