@echo off
echo ==============================================
echo   GERADOR DO SITE OTTOMATIC (PASTA OUT)      
echo ==============================================
echo.
echo Limpando a memoria cache antiga do Next.js...
if exist ".next" (
    rmdir /S /Q ".next"
    echo Cache /.next limpo com sucesso!
) else (
    echo Nenhum cache antigo encontrado.
)
echo.

echo Baixando textos novos do Sanity e construindo o novo Design...
echo Isso pode levar cerca de 30 segundos, aguarde.
call npm run build

echo.
echo ==============================================
echo   MUITO BEM! PROCESSO FINALIZADO!            
echo ==============================================
echo Sua nova pasta "out" esta novinha e atualizada na sua area de trabalho.
echo Agora e so apagar tudo dentro da pasta "public_html" no Hostinger
echo e arrastar todos os arquivos da sua pasta "out" para la!
echo.
pause
