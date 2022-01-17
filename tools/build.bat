@chcp 65001
pushd
setlocal
cd %~dp0..
call efront build %*
@REM for /d %%i in (..\yunxu1019.github.io\*) do rd /s /q %%i
@REM xcopy /s /y /q public ..\yunxu1019.github.io\
@REM cd ..\yunxu1019.github.io\
@REM git checkout --orphan clean
@REM git branch -D master
@REM git branch -m master
@REM git add .
@REM git commit -m 新版本
@REM git push --set-upstream origin master --force
endlocal
popd