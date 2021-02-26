pushd
cd %~dp0..
call efront build
for /d %%i in (..\yunxu1019.github.io\*) do rd /s /q %%i
xcopy /s /y /q public ..\yunxu1019.github.io\
popd