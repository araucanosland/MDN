


CREATE TABLE empresas.[Fidelizacion] (
[CodFide] bigint NOT NULL IDENTITY(1,1),
[RutEmpresa] varchar(100) NOT NULL,
[NombreEmpresa] varchar(255) NULL,
[HoldingEmpresa] varchar(255) NULL,
[Area] varchar(255) NULL,
[AmbitoAccion] varchar(255) NULL,
[Estamento] varchar(255) NULL,
[Actividad] varchar(255) NULL,
[Cobertura] varchar(255) NULL,
[NombreRepresentanteEmpresa] varchar(255) NULL,
[Cargo] varchar(255) NULL,
[FechaIngreso] datetime NULL,
[FechaCreacion] datetime NOT NULL,
[RutEjecutivo] varchar(100) NOT NULL,
[Oficina] int NOT NULL,
PRIMARY KEY ([CodFide]) 
)
GO


CREATE PROCEDURE empresas.sp_Fidelizacion_Guardar
(
	@CodFide bigint,
	@RutEmpresa varchar(100),
	@NombreEmpresa varchar(255),
	@HoldingEmpresa varchar(255),
	@Area varchar(255),
	@AmbitoAccion varchar(255),
	@Estamento varchar(255),
	@Actividad varchar(255),
	@Cobertura varchar(255),
	@NombreRepresentanteEmpresa varchar(255),
	@Cargo varchar(255),
	@FechaIngreso datetime,
	@FechaCreacion datetime,
	@RutEjecutivo varchar(100),
	@Oficina int
)
AS
-- =============================================
-- Autor                  : @Charly
-- Fecha de Creacion      : 04-01-2018 15:40:19
-- Tabla Principal        : TabEmp_Fidelizacion
-- Descripcion            : Guarda un registro en la tabla TabEmp_Fidelizacion
-- =============================================
-- Modificado por         :
-- Fecha de Modificacion  :
-- Descripcion            :
-- =============================================
BEGIN

	SET NOCOUNT ON;

	DECLARE @identity bigint

	SET @identity = @CodFide

	IF @identity > 0
	BEGIN
		UPDATE TabEmp_Fidelizacion SET 
			RutEmpresa = @RutEmpresa,
			NombreEmpresa = @NombreEmpresa,
			HoldingEmpresa = @HoldingEmpresa,
			Area = @Area,
			AmbitoAccion = @AmbitoAccion,
			Estamento = @Estamento,
			Actividad = @Actividad,
			Cobertura = @Cobertura,
			NombreRepresentanteEmpresa = @NombreRepresentanteEmpresa,
			Cargo = @Cargo,
			FechaIngreso = @FechaIngreso,
			FechaCreacion = @FechaCreacion,
			RutEjecutivo = @RutEjecutivo,
			Oficina = @Oficina
		WHERE CodFide = @identity
	END
	ELSE
	BEGIN
		INSERT INTO TabEmp_Fidelizacion
		(
			RutEmpresa,
			NombreEmpresa,
			HoldingEmpresa,
			Area,
			AmbitoAccion,
			Estamento,
			Actividad,
			Cobertura,
			NombreRepresentanteEmpresa,
			Cargo,
			FechaIngreso,
			FechaCreacion,
			RutEjecutivo,
			Oficina
		)
		VALUES
		(
			@RutEmpresa,
			@NombreEmpresa,
			@HoldingEmpresa,
			@Area,
			@AmbitoAccion,
			@Estamento,
			@Actividad,
			@Cobertura,
			@NombreRepresentanteEmpresa,
			@Cargo,
			@FechaIngreso,
			@FechaCreacion,
			@RutEjecutivo,
			@Oficina
		)

		SELECT @identity = SCOPE_IDENTITY()
	END

	SELECT @identity
END