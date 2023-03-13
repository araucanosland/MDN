ALTER PROCEDURE [dbo].[spMotor_Asignacion_ObtenerByAfiliado]
	@Periodo AS int ,
  @AfiliadoRut AS varchar(20)
AS
BEGIN
  -- routine body goes here, e.g.
  -- SELECT 'Navicat for SQL Server'

	select * 
	from TabMotor_Asignacion
	where periodo=(select max(Periodo) from TabMotor_Asignacion)
	and (CONVERT(VARCHAR(20),Afiliado_Rut) + '-' + Afiliado_Dv = @AfiliadoRut OR CONVERT(VARCHAR(20),Afiliado_Rut) = @AfiliadoRut)

END
