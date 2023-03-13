CREATE PROCEDURE [dbo].[spMotor_AsignarOficina]
(
	@Asignacion int,
	@Oficina int
)
AS
-- =============================================
-- Autor                  : Carlos Pradenas
-- Fecha de Creacion      : 11-04-2017 17:46:40
-- Tabla Principal        : TabMotor_Asignacion
-- Descripcion            : Guarda un registro en la tabla TabMotor_Asignacion
-- =============================================
-- Modificado por         :
-- Fecha de Modificacion  :
-- Descripcion            :
-- =============================================
BEGIN

	SET NOCOUNT ON;

	
		UPDATE TabMotor_Asignacion SET 
			Oficina = @Oficina
		WHERE id_Asign = @Asignacion
	
END
GO



ALTER TABLE [dbo].[TabMotor_Contacto_Afiliado]
ADD [Fecha_contacto] datetime NULL 
GO



ALTER PROCEDURE [dbo].[spMotor_Contactoafiliado_Guardar]
(
	@Afiliado_rut int,
	@Fecha_accion datetime,
	@Tipo_contacto varchar(255),
	@Valor_contacto varchar(255),
	@Valido tinyint
)
AS
-- =============================================
-- Autor                  : @Charly
-- Fecha de Creacion      : 04-05-2017 18:31:58
-- Tabla Principal        : TabMotor_ContactoAfiliado
-- Descripcion            : Guarda un registro en la tabla TabMotor_ContactoAfiliado
-- =============================================
-- Modificado por         :
-- Fecha de Modificacion  :
-- Descripcion            :
-- =============================================
--	select * from TabMotor_Contacto_Afiliado
BEGIN

	SET NOCOUNT ON;

	DECLARE @existe int

	select @existe = count(*) 
	from TabMotor_Contacto_Afiliado 
	where Afiliado_rut = @Afiliado_rut 
	and  Valor_contacto = @Valor_contacto 
	and Tipo_contacto = @Tipo_contacto


	IF (@existe > 0) 
	BEGIN
		UPDATE TabMotor_Contacto_Afiliado SET 
			Afiliado_rut = @Afiliado_rut,
			Fecha_accion = @Fecha_accion,
			Tipo_contacto = @Tipo_contacto,
			Valor_contacto = @Valor_contacto,
			Valido = @Valido,
			Fecha_contacto = GETDATE()
		WHERE Afiliado_rut = @Afiliado_rut and  Valor_contacto = @Valor_contacto and Tipo_contacto = @Tipo_contacto
	END
	ELSE
	BEGIN
		INSERT INTO TabMotor_Contacto_Afiliado
		(
			Afiliado_rut,
			Fecha_accion,
			Tipo_contacto,
			Valor_contacto,
			Valido,
			Fecha_contacto
		)
		VALUES
		(
			@Afiliado_rut,
			@Fecha_accion,
			@Tipo_contacto,
			@Valor_contacto,
			@Valido,
			GETDATE()
		)

		--SELECT @identity = SCOPE_IDENTITY()
	END

	--SELECT @identity
END

GO

CREATE PROCEDURE [dbo].[spMotor_Contactoafiliado_ObtenerUnico]
(
	@Afiliado_rut int,
	@Valor varchar(100)
)
AS
-- =============================================
-- Autor                  : @Charly
-- Fecha de Creacion      : 04-05-2017 18:32:56
-- Tabla Principal        : TabMotor_ContactoAfiliado
-- Descripcion            : Recupera un registro la TabMotor_ContactoAfiliado dado un Afiliado_rut
-- =============================================
-- Modificado por         :
-- Fecha de Modificacion  :
-- Descripcion            :
-- =============================================
BEGIN

	SET NOCOUNT ON;

	SELECT
		Afiliado_rut,
		Fecha_accion,
		Tipo_contacto,
		Valor_contacto,
		Valido,
		Fecha_contacto
	FROM
		TabMotor_Contacto_Afiliado
	WHERE
		Afiliado_rut = @Afiliado_rut
	AND 
		(Valor_contacto = @Valor or Valor_contacto = '+' + @Valor)




END

GO


ALTER PROCEDURE [dbo].[spMotor_Contactoafiliado_Obtener]
(
	@Afiliado_rut int,
	@Tipo varchar(100)
)
AS
-- =============================================
-- Autor                  : @Charly
-- Fecha de Creacion      : 04-05-2017 18:32:56
-- Tabla Principal        : TabMotor_ContactoAfiliado
-- Descripcion            : Recupera un registro la TabMotor_ContactoAfiliado dado un Afiliado_rut
-- =============================================
-- Modificado por         :
-- Fecha de Modificacion  :
-- Descripcion            :
-- =============================================
BEGIN

	SET NOCOUNT ON;

	SELECT
		Afiliado_rut,
		Fecha_accion,
		Tipo_contacto,
		Valor_contacto,
		Valido,
		Fecha_contacto
	FROM
		TabMotor_Contacto_Afiliado
	WHERE
		Afiliado_rut = @Afiliado_rut
	AND 
		Tipo_contacto = @Tipo




END

GO