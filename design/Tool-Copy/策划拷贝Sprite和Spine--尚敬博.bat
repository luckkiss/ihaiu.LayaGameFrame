(
	svn update ../../gamepf_art/Animation/Sk
	dotnet ./Copy/Copy.dll --setting=./Plan_CopySpine_ShangJingBo.json
	svn update ../../arts/fspriteassets
	dotnet ./Copy/Copy.dll --setting=./Plan_CopyFSprite_ShangJingBo.json
)