using System;
using System.Configuration;

namespace CDK.System.Configuration
{
    /// <summary>
    /// ConfigHelper
    /// </summary>
    public static class ConfigHelper
    {
        /// <summary>
        /// Obtiene el valor de una clave del archivo de configuracion <c>web.config</c>
        /// </summary>
        /// <param name="key">clave</param>
        /// <param name="arrojarExcepcion">arrojar excepción en caso de que no exista key, si es asignado a <c>false</c> se retornará un valor por defecto</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns></returns>
        /// <exception cref="NullReferenceException">No existe el parámetro en el archivo de configuracion, sólo si <para>arrojarExcepcion</para> es <c>true</c>.</exception>
        public static string ObtenerKeyWebConfig(string key, bool arrojarExcepcion = true, string defaultValue = "")
        {
            return ObtenerKeyAppConfig(key, arrojarExcepcion, defaultValue);
        }

        /// <summary>
        /// Obtiene el valor de una clave del archivo de configuracion <c>web.config</c>
        /// </summary>
        /// <param name="key">clave</param>
        /// <param name="arrojarExcepcion">arrojar excepción en caso de que no exista key, si es asignado a <c>false</c> se retornará un valor por defecto</param>
        /// <param name="defaultValue">The default value.</param>
        /// <returns></returns>
        /// <exception cref="NullReferenceException">No existe el parámetro en el archivo de configuracion, sólo si <para>arrojarExcepcion</para> es <c>false</c>.</exception>
        public static string ObtenerKeyAppConfig(string key, bool arrojarExcepcion = true, string defaultValue = "")
        {
            string valor = ConfigurationManager.AppSettings.Get(key);

            if (string.IsNullOrWhiteSpace(valor))
            {
                if (arrojarExcepcion)
                {
                    throw new NullReferenceException("No existe el parámetro '" + key + "' en el archivo de configuracion");
                }
                if (!string.IsNullOrWhiteSpace(defaultValue))
                {
                    ConfigurationManager.AppSettings.Set(key, defaultValue);
                    return defaultValue;                        
                }
                return string.Empty;
            }

            return valor;
        }

        /// <summary>
        /// Obtiene un cadena de conexión del archivo de configuracion <c>web.config</c> o <c>app.config</c>
        /// </summary>
        /// <param name="connectionStringKey">Clave de la cadena de conexión</param>
        /// <returns></returns>
        /// <exception cref="NullReferenceException">No existe la cadena de conexión en el archivo de configuracion</exception>
        public static string ObtenerConnectionString(string connectionStringKey)
        {
            ConnectionStringSettings connectionString = ConfigurationManager.ConnectionStrings[connectionStringKey];

            if (connectionString == null || string.IsNullOrWhiteSpace(connectionString.ConnectionString))
            {
                throw new NullReferenceException("No existe la cadena de conexión '" + connectionStringKey + "' en el archivo de configuracion");
            }

            return connectionString.ConnectionString;
        }

        /// <summary>
        /// Refresca el contenido de la sección appSettings
        /// </summary>
        public static void RefrescarAppSettings()
        {
            ConfigurationManager.RefreshSection("appSettings");
        }

        /// <summary>
        /// Refresca el contenido de la sección connectionStrings
        /// </summary>
        public static void RefrescarConnectionStrings()
        {
            ConfigurationManager.RefreshSection("connectionStrings");
        }
    }
}
