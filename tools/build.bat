pushd
cd %~dp0..
call efront build
xcopy /s /y /q public ..\yunxu1019.github.io\
popd